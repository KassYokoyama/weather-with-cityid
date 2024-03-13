const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
//displays index.html of root path
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
});
//invoked after hitting go in the html form
app.post("/", function(req, res) {
    
    var zip = String(req.body.zipInput);
    const units = "imperial";
    const apiKey = "0c258df830517dcb0bb96a6a5d8bad3e"; // 
    const url = "https://api.openweathermap.org/data/2.5/weather?zip=" + zip + "&units=" + units + "&APPID=" + apiKey;
    
    https.get(url, function(response){
        console.log(response.statusCode);
        
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const city = weatherData.name;
            const temp = weatherData.main.temp;
            const humidity = weatherData.main.humidity;
            const windSpeed = weatherData.wind.speed;
            const windDeg = weatherData.wind.deg;
            const cloudiness = weatherData.clouds.all;
            
            res.write("<h1>Weather in " + city + "</h1>");
            res.write("<h2>Temperature: " + temp + "°F</h2>");
            res.write("<h2>Humidity: " + humidity + "%</h2>");
            res.write("<h2>Wind Speed: " + windSpeed + " m/s</h2>");
            res.write("<h2>Wind Direction: " + windDeg + "°</h2>");
            res.write("<h2>Cloudiness: " + cloudiness + "%</h2>");
            
            res.send();
        });
    });
});
app.listen(process.env.PORT || 3000, function() {
    console.log("Server is running on port");
});
