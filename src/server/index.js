var path = require('path');
const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const  cors = require('cors')

const app = express()



app.use(cors())
app.use(express.static('dist'))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setup empty JS object to act as endpoint for all routes
const geoData = [];
const weatherData = [];


app.get('/', function (req, res) {
    res.status(200).sendFile(path.resolve(__dirname, 'dist/index.html'))
    
})

app.get('/allGeoData', getData)
function getData(req, res){
    res.send(geoData)
}
app.get('/WeatherData', getWeatherData)
function getWeatherData(req, res){
    res.send(weatherData)
}


//POST route
app.post("/", function(req, res){
    request(baseURL)
})
app.post('/addGeoData', function(req, res){       
    newEntry={
        lat: req.body.lat,
        lng: req.body.lng,
        countryName: req.body.countryName,
        city_country: req.body.city_country
    }
    geoData.push(newEntry)
    res.send(geoData)
    console.log(geoData);
});
app.post('/addWeatherData', function(req, res){       
    weatherEntry={
        weather :req.body.weather
    }
    weatherData.push(weatherEntry)
    res.send(weatherData)
    console.log(weatherData);
});



// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    // console.log('Example app listening on port 8080!')
})



module.exports.app = app;