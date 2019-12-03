/* Global Variables */
//Personal API Key for Pixabay
const pixabayApiKey = '?key=14429196-984aeaa78fd5e3a738036f230'
const pixabayBaseURL = `https://pixabay.com/api/${pixabayApiKey}&q=`

//Personal API Key for Dark Blue
const darkApiKey = 'ae6ef7c8ff0231dd4f01ee4108e6413b'
const darkBaseURL = `https://api.darksky.net/forecast/${darkApiKey}&q=country`
//  https://api.darksky.net/forecast/[key]/[latitude],[longitude]
// Personal API Key for GEONAMES API
const apiKey = 'username=dominika_ongoing';
// const baseURL = `http://api.geonames.org/weatherIcaoJSON?${apiKey}&country=`;
const baseURL = `http://api.geonames.org/searchJSON?${apiKey}&`;

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
  const country = document.getElementById('zip').value;
  getLocation(baseURL, country);
};

const getLocation = async(baseURL, location) =>{

  const city = location.split(',')[0];
  const country = location.split(',')[1];

  const res = await fetch(baseURL + 'country=' + country + '&q' + city + '&maxRows=1');
  const data = await res.json();

  // console.log("data");
  // console.log(data);
  // console.log('test', data, country);
  console.log('test', data, res);

  //Add data to post request
  // postData('/add', { lng:data, country:country})
  // postData('/add', {lng:data.geonames[0].lng, lat:data.geonames[0].lat, country:data.geonames[0].name})


  // show in UI
  updateUI(data.geonames);
}
const postData = async ( url = '', data = {})=>{
    console.log(data);      
      const response = await fetch(url, country, {
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



// UI UPDATE
const updateUI = async (newData) => {
  // const request = await fetch('/all')
  try{
    // const newData = await request.json()


  // Create a new date instance dynamically with JS

  var x = Math.floor((Math.random() * 25) + 1);   //day
  var y = Math.floor((Math.random() * 10) + 1);   //month
  var s = Math.floor((Math.random() * 5) );   //year

  
  // DEPARTING TIME 
  let t = new Date();
  let newDateTrip = (t.getDate()+ x) + '.' + (y)+'.'+ (t.getFullYear()+s);
  // console.log(`Departing : ${newDateTrip}`);
  const departing = document.getElementById('trips-time').innerHTML = `<h3>Departing: ${newDateTrip}</h3>`;

  // Today Date
  let d = new Date();
  let newDate = d.getDate()+'.'+ (d.getMonth()+1)+'.'+ d.getFullYear();
  // console.log(`Today is ${newDate}`);
  const today = document.getElementById('date').innerHTML = `<h3>Today is: ${newDate}</h3>`;


  document.getElementById('country').innerHTML = newData[0].name;
  document.getElementById('countryCode').innerHTML = newData[0].countryCode;
  document.getElementById('low').innerHTML = newData[0].lng;
  document.getElementById('high').innerHTML = newData[0].lat;
  
  }catch(error){
    console.log("error", error);
  }
}

// ###################       Add Note      ##################################

// toggle (add) note button
let addbtn = document.getElementById('btn-note');
addbtn.addEventListener('click', function(){
    let notes = document.querySelector('.notes');
    notes.classList.toggle('text-show');
});


//  SAVE 
let note_btn = document.getElementById('text-submit-btn');

note_btn.addEventListener('click', function(){
  const note = document.getElementById('text-notes').value;
  document.getElementById('last-note').innerText =  note;
  console.log('Note for:'+ note);
  
  
});



// document.getElementById('text-submit-btn').addEventListener('click', addNewNote);

// function addNewNote(e) {
//   const note = document.getElementById('text-notes').value;

// fetch("/addNote", {
//   method: "POST",
//   mode: "cors",
//   headers: {
//     "Content-Type": "application/json",
//     'Accept': 'application/json'
//   },
//   body: JSON.stringify({ text })
// })
//   .then(res => {        
//     return res.json()
//   })
//   .then(function(res) {
//     document.getElementById("last-note").innerHTML = res.note;
//   })
// }


export{performAction, getLocation, postData, updateUI}