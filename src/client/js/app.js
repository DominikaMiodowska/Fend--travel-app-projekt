/* Global Variables */
//Personal API Key for Pixabay
const pixabayApiKey = '?key=14429196-984aeaa78fd5e3a738036f230'
const pixabayBaseURL = `https://pixabay.com/api/${pixabayApiKey}/`
//Personal API Key for Dark Blue
const darkApiKey = 'ae6ef7c8ff0231dd4f01ee4108e6413b'
const darkBaseURL = `https://api.darksky.net/forecast/${darkApiKey}&q=zip`
//  https://api.darksky.net/forecast/[key]/[latitude],[longitude]
// Personal API Key for GEONAMES API
const apiKey = 'username=dominika_ongoing&';
const baseURL = `http://api.geonames.org/weatherIcaoJSON?${apiKey}&zip=`;

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
  const zip = document.getElementById('zip').value;
  getLocation(baseURL, zip);
};

const getLocation = async(baseURL, zip) =>{
  const res = await fetch(baseURL + zip);
  const data = await res.json();

  console.log('test', data.weatherObservation.lng, data.weatherObservation.lat, zip);

  console.log('test', data, res);

  //Add data to post request  date: data.date,
  postData('/add', { lng:data.weatherObservations.lng, lat:data.weatherObservations.lat, zip:zip})

  // show in UI
  updateUI()
}
const postData = async ( url = '', data = {})=>{
    console.log(data);      
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });

      try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }

// Create a new date instance dynamically with JS

let t = new Date();
let newDateTrip = (t.getDate()+10) + '.' + (t.getMonth()+4)+'.'+ t.getFullYear();
// console.log(`Departing : ${newDateTrip}`);
const departing = document.getElementById('trips-time').innerHTML = `<h3>Departing: ${newDateTrip}</h3>`;

let d = new Date();
let newDate = d.getDate()+'.'+ (d.getMonth()+1)+'.'+ d.getFullYear();
// console.log(`Today is ${newDate}`);
const today = document.getElementById('date').innerHTML = `<h3>Today is: ${newDate}</h3>`;


// UI UPDATE
const updateUI = async () => {
  const request = await fetch('/all')
  try{
    const allData = await request.json()
  
    document.getElementById('country').innerHTML = allData[0].zip;
    document.getElementById('high').innerHTML = allData[0].lang;
    document.getElementById('low').innerHTML = allData[0].lat;
  
  }catch(error){
    console.log("error", error);
  }
}

// ###################       Add Note      ##################################

// toggle (add) note
let addbtn = document.getElementById('btn-note');
addbtn.addEventListener('click', function(){
    let notes = document.querySelector('.notes');
    notes.classList.toggle('text-show');
});


// 
let note_btn = document.getElementById('text-submit-btn');

note_btn.addEventListener('click', function(){
  const note = document.getElementById('text-notes').value;
  document.getElementById('last-note').innerText =  note;
  
});


export{performAction, getLocation, postData, updateUI}