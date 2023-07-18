const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();


app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){

    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req,res){
    
    const query = req.body.cityName;
    
    const apiKey = "e540395a628ffbe6c048fc6c37299690";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units="+ unit +"&appid=" + apiKey;
    https.get(url , function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
        //    console.log(temp);

            const weatherDis = weatherData.weather[0].description;
          //  console.log(weatherDis);

            const icon = weatherData.weather[0].icon;

            const imageURL = "https://openweathermap.org/img/wn/"+ icon + "@2x.png";
         
             
            res.write("<p> The weather is currently " + weatherDis + "<p>");
            res.write("<h1> The temperature in "+ req.body.cityName + " is " + temp + " degree Celcius.<h1>");
            res.write("<img src ="+ imageURL +" >");
            res.send();

          /*  const object = {
                name:"anintellectualbeing",
                favFood:"Metal"
            }
            console.log(JSON.stringify(object));
            */
        })

        })







})

app.listen(3000, function(){
    console.log("server started on port 3k");
})



        