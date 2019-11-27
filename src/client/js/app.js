/* Global Variables */
// Personal API Key for OpenWeatherMap API
const apiKey = 'appid=7d9ab1f237d14cf0daf5898c7036e76f';
const baseURL = `https://api.openweathermap.org/data/2.5/weather?${apiKey}&zip=`;

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
  const zip = document.getElementById('zip').value;
  const feeling = document.getElementById('feelings').value;
  getLocation(baseURL, zip, feeling);
};

const getLocation = async(baseURL, zip, feeling) =>{
  const res = await fetch(baseURL + zip);
  const data = await res.json();

  console.log('test', data.main.temp, feeling);

  console.log('test', data, res);

  //Add data to post request  date: data.date,
  postData('/add', { temp:data.main.temp, zip:zip, feeling:feeling})

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
let d = new Date();
let newDate = d.getDate()+'.'+ (d.getMonth()+1)+'.'+ d.getFullYear();
console.log(`Today is : ${newDate}`);

// UI UPDATE
const updateUI = async () => {
  const request = await fetch('/all')
  try{
    const allData = await request.json()
    
    const content = document.getElementById('date').innerHTML = `<h2>${newDate}</h2>`;
    document.getElementById('temp').innerHTML = allData[0].temp;
    document.getElementById('content').innerHTML = allData[0].feeling;
  
  }catch(error){
    console.log("error", error);
  }
}