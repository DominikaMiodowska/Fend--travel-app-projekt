/* Global Variables */
// Personal API Key for OpenWeatherMap API
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

  console.log('test', data.weatherObservations.temperature);

  console.log('test', data, res);

  //Add data to post request  date: data.date,
  postData('/add', { temp:data.weatherObservations.temperature, zip:zip})

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
console.log(`Departing : ${newDateTrip}`);
const departing = document.getElementById('trips-time').innerHTML = `<h3>Departing: ${newDateTrip}</h3>`;

let d = new Date();
let newDate = d.getDate()+'.'+ (d.getMonth()+1)+'.'+ d.getFullYear();
console.log(`Today is ${newDate}`);
const today = document.getElementById('date').innerHTML = `<h3>Today is: ${newDate}</h3>`;


// UI UPDATE
const updateUI = async () => {
  const request = await fetch('/all')
  try{
    const allData = await request.json()
    
    const content = document.getElementById('date').innerHTML = `<h2>${newDate}</h2>`;
    document.getElementById('temp-max').innerHTML = allData[0].temp;
    document.getElementById('temp-min').innerHTML = allData[0].temp;
    // document.getElementById('description').innerHTML = allData[0].feeling;
  
  }catch(error){
    console.log("error", error);
  }
}




export{performAction, getLocation, postData, updateUI}