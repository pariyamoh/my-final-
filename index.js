function bringTemp (response){
let temperatureElement = document.querySelector("#degree");
let degree = response.data.temperature.current;
let cityElement = document.querySelector("#city");
let conditionElement = document.querySelector("#condition");
let humidityElement = document.querySelector("#humidity");

let feelslike = document.querySelector("#feelslike");
let windElement = document.querySelector ("#wind");
let timesElement = document.querySelector ("#times");
let date = new Date(response.data.time * 1000);
let iconElement = document.querySelector("#icon");






cityElement.innerHTML = response.data.city;
temperatureElement.innerHTML = Math.round(degree);
conditionElement.innerHTML = response.data.condition.description;
humidityElement.innerHTML = `${response.data.temperature.humidity}%,`;
windElement.innerHTML  = `${response.data.wind.speed} Km/h`;
timesElement.innerHTML = formatDate(date);
iconElement.innerHTML =`<img src = "${response.data.condition.icon_url}"  class="weather-icon" />`;
feelslike.innerHTML = response.data.temperature.feels_like;

getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

    let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}



function searchPlace (city){
let apiKey = "94a4oafdtf0d380ca243ac81b53c4ce3";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`
axios.get(apiUrl).then(bringTemp);
}

function convertDay (timestamp) {
  let date = new Date (timestamp * 1000 ) ;
  let days = ["Sun" , "Mon" , "Tue" , "wed" , "Thu" , "Fri" , "Sat"];
  return days [date.getDay()];
}



function showingName (event){
  event.preventDefault();
  let searchBox = document.querySelector("#search-box");
  searchPlace(searchBox.value);
}

function getForecast(city){
let apiKey ="94a4oafdtf0d380ca243ac81b53c4ce3";
let apiUrl =` https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`
axios(apiUrl).then(showingForecast);
}



function showingForecast (response){
let forecastHtml= "";

response.data.daily.forEach(function (day,index){
  if (index < 5 ){
forecastHtml = 
forecastHtml + 
 ` 
<div class="forecast-day">
<div class="forecast-date">${convertDay(day.time)}</div>
<div class="forecast-emoji">
<img src = "${day.condition.icon_url}"/>
</div>
<div class="forecast-temps">
<div class="forecast-temp12">${Math.round(day.temperature.maximum)} ° </div>
<div class="forecast-temp12">${Math.round(day.temperature.minimum)} °</div>
</div>
</div>
`;
}
});


let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = forecastHtml;
}


let searchFormElement = document.querySelector("#searching");
searchFormElement.addEventListener("submit", showingName);


searchPlace("Tehran");

showingForecast("Tehran");







