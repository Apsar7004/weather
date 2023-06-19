const express=require('express');
const https=require('https');
const { dirname } = require('path');
const bodyparser=require('body-parser');
const app=express();
app.use(bodyparser.urlencoded({ extended: true }));
require("dotenv").config();


app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html");
})




app.post("/",(req,res)=>{

    console.log("hi");


    const units="metric";
    const city=req.body.city1;
    const apikey=process.env.apikey;
    
    var url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apikey+"&units="+units;
    
    

    
/*this https useful to get the data from exxternal server.
       to access requre the https built in mrthod in the node.
       the in the app main page use get method ih the https to 
       recieve the data from the url and set a function to perform an action
       but when we console  the response we get a huge  outcome .but we only
       require the data .to access use on method in the https to see it .
       we used the Json to see the data in jason format it is similar to 
       accessing the data in the objec t but we 1st declaring the object..
*/



https.get(url,function(response){
    console.log(response.data);
    response.on("data",function(da){
        const weather=JSON.parse(da);
        const temp=weather.name;
        const temp3=weather.main.temp;
        const temp2= weather.weather[0].description;
        const temp4=weather.weather[0].icon;
        const img1="http://openweathermap.org/img/wn/"+temp4+"@2x.png";
       // console.log(weather);
       // console.log(temp2);
       // console.log(temp);
        res.write("<h1>the temp in "+city+" is "+temp3+" degree celcius</h1>");
        
        res.write("<img src="+ img1 +">");
        res.send();
    })

    
})

});



app.listen(3001,()=>{
console.log("server is running");   
})




