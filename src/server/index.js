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

app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'dist/index.html'))
})



// app.get('/all', getData)
// function getData(req, res){
//     res.send(projectData)
// }

//POST route
app.post("/", function(req, res){
    request(baseURL)
})

// app.post('/add', function(req, res){   
//      console.log(req)
    
//     newEntry={
//         // date: req.body.date,
//         country: req.body.name,
//         lng: req.body.lng,
//         lat: req.body.lat,
//         // note: req.body.note
//     }
//     projectData.push(newEntry)
//     res.send(projectData)
//     console.log(projectData);
// });


// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})
