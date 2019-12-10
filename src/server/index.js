var path = require('path');
const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const  cors = require('cors')

// const apiKey = 'username=dominika_ongoing';
// const baseURL = `http://api.geonames.org/searchJSON?${apiKey}&`;

const app = express()
app.use(cors())
app.use(express.static('dist'))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setup empty JS object to act as endpoint for all routes
projectData = [];


app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'dist/index.html'))
})

app.get('/all', getData)
function getData(req, res){
    res.send(projectData)
}

//POST route
app.post("/", function(req, res){
    request(baseURL)
})

app.post('/add', function(req, res){       
    newEntry={
        // date: req.body.date,
        lat: req.body.lat,
        lng: req.body.lng,
        countryName: req.body.countryName,
        city_country: req.body.city_country
    }
    projectData.push(newEntry)
    res.send(projectData)
    // console.log(projectData);
});



// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})
