var path = require('path');
const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const  cors = require('cors')

const dotenv = require('dotenv');

dotenv.config();
// console.log(process.env);

const baseURL = "https://api.aylien.com/api/v1/sentiment";

    
const app = express()
app.use(cors())
app.use(express.static('dist'))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
    // console.log(req.body)
    
    newEntry={
        // date: req.body.date,
        zip: req.body.zip,
        temp: req.body.temp,
        feeling: req.body.feeling
    }
    projectData.push(newEntry)
    res.send(projectData)
    console.log(projectData);
});
   
// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})
