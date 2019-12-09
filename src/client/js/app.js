'use strict'
/* Global Variables */
//Personal API Key for Pixabay  (Photo)
const pixabayApiKey = '?key=14429196-984aeaa78fd5e3a738036f230'
const pixabayBaseURL = `https://pixabay.com/api/${pixabayApiKey}&q=`

//Personal API Key for Dark Blue  (weather)
const darkApiKey = 'ae6ef7c8ff0231dd4f01ee4108e6413b'
const darkBaseURL = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${darkApiKey}/`

// Personal API Key for GEONAMES API  (location, lat, low)
const apiKey = 'username=dominika_ongoing';
const baseURL = `http://api.geonames.org/searchJSON?${apiKey}&`;

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
  const country = document.getElementById('zip').value;
  getLocation(baseURL, country);
  getImage(pixabayBaseURL, country);
 
};

// ########################      LOCATION    ################################
const getLocation = async(baseURL, location) =>{
  const city = location.split(',')[0];
  const country = location.split(',')[1];
  const res = await fetch(baseURL + 'country=' + country + '&q' + city + '&maxRows=1');
  const data = await res.json();
  // console.log('test', data, res);
  updateUI(data.geonames);
  getWeather(darkBaseURL)
  // show in UI
}

// ########################      IMAGE    ################################
const getImage = async(pixabayBaseURL, location) =>{
  
  const city = location.split(',')[0];
  const res = await fetch(pixabayBaseURL +  city );
  const data = await res.json();
  // console.log('test', data.hits[0].largeImageURL);
  var image = document.getElementById('img-trip');
 image.src = data.hits[0].largeImageURL;
}
// ########################     WEATHER  ################################

const getWeather = async(darkBaseURL, latitude, longitude) =>{

  
  latitude = document.getElementById('high').innerText;
  longitude = document.getElementById('low').innerText;
  
  const res = await fetch(darkBaseURL +  latitude + ',' + longitude );
  const data = await res.json();
  document.getElementById('weather').innerHTML = data.daily.summary;

}

// UI UPDATE
const updateUI = async (newData) => {

  try{

  //#########################    Days between two dates    ############################################
  
  // Create a new date instance dynamically with JS
  var x = Math.floor((Math.random() * 25) + 1);   //day
  var y = Math.floor((Math.random() * 9) +1);   //month
  var s = Math.floor((Math.random() * 5)+1);   //year

  // DEPARTING TIME 
  let t = new Date();
  let newDateTrip = new Date( (t.getMonth()-y)+'/'+ (t.getDate()+ x) + '/' +(t.getFullYear()+s))
    
  // Today Date
  let d = new Date();
  let newDate = new Date((d.getMonth()+1)+'/'+ d.getDate()+'/'+ d.getFullYear());

  //Calculate the difference in Time and in Days
  let differencie_in_time = (newDateTrip.getTime())-(newDate.getTime());
  let difference_in_days = Math.floor(differencie_in_time/(1000*3600*24));
  
  //#########################   update the UI    ############################################
  document.getElementById('date').innerHTML = `<h3>Today is: ${newDate.getDate()+'.'+(newDate.getMonth()+1)+'.'+ newDate.getFullYear()}</h3>`;
  document.getElementById('trips-time').innerHTML = `<h3>Departing: ${ newDateTrip.getDate()+'.'+newDateTrip.getMonth()+'.'+ newDateTrip.getFullYear()}</h3>`;  
  document.getElementById('days').innerHTML = `${difference_in_days}`

  document.getElementsByClassName('country')[0].innerHTML = newData[0].name;
  document.getElementsByClassName('country')[1].innerHTML = newData[0].name;
  document.getElementById('countryCode').innerHTML = newData[0].countryName;
  document.getElementById('high').innerHTML = newData[0].lat;
  document.getElementById('low').innerHTML = newData[0].lng;
  

console.log( newData);


  }catch(error){
    console.log("error", error);
  }
}

// ###################       Add Note      ##################################
function toggleNotes() {
  let notes = document.querySelector('.notes');
    notes.classList.toggle('text-show');
}
// toggle (add) note button
let addbtn = document.getElementById('btn-note');
addbtn.addEventListener('click', function(){
  toggleNotes()
});

//  SAVE 
let note_btn = document.getElementById('text-submit-btn');
note_btn.addEventListener('click', function(){
  const note = document.getElementById('text-notes').value;
  document.getElementById('last-note').innerText =  note;
  toggleNotes()
});


export{performAction, getLocation, updateUI}