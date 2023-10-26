const api = {
  key: "fcc8de7015bbb202209bbf0261babf4c",
  base: "https://api.openweathermap.org/data/2.5/"
}



const searchbox = document.querySelector('.search-box');//he addEventListener function is configured to call the setQuery function when the keypress event occurs on the searchbox element.
searchbox.addEventListener('keypress', setQuery);  //event handler-setquery keypress-waits for key to be pressed -event nae



function setQuery(evt) {// evt is event objrct  called when keypress is detected
  if (evt.keyCode == 13) { //key or combination of keys was pressed or released during a keyboard event.keycode-ascii
    getResults(searchbox.value);//searchbox.value-->sin/apore
  }
}




function getResults (query) {//newyork
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)//fetch eturn promise if api call is sucess
    .then(weather => {
      return weather.json();//JSON.parse(jsonString);JSON.parse--converts api response tojs object
    }).then(displayResults);//calls the displayResults function with the JSON data as an argument.
}




function displayResults (weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;//innertext property that allows to write text in an elemnt
// ${} syntax allows you to embed the values of weather.name and weather.sys.country
  let now = new Date();//object creation usin now
  let date = document.querySelector('.location .date');//html class date and location
  date.innerText = dateBuilder(now);//inbuilt function that  string representing the date in a human-readable format.

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°tt</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;
  
  //This "main" property typically represents the primary weather condition, such as "Clear," "Rain," "Clouds," etc.

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

  //values allare extracted from weather objects which consists of json to js data
}

function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();
  /*It uses the getDay(), getDate(), getMonth(), and getFullYear() 
  methods of the Date object (d) to extract the day of the week, day of the month, month, and year,*/ 

  return `${day} ${date} ${month} ${year}`;
}