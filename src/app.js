let now = new Date();
let hour = now.getHours();
if (hour < 10) {
  hour = "0" + hour;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let dayElement = document.querySelector("#day");
let timeElement = document.querySelector("#time");
dayElement.innerHTML = day;
timeElement.innerHTML = hour + ":" + minutes;


function displayForecast(response) {
  console.log(response);
  let forecastElement = document.querySelector(".weather-forecast");

  let forecastHTML = `<div class ="row">`;
  let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` <div class="col-2"> 
        	<div class="weather-forecast-date">${day}</div>
		<img
                  src="https://ssl.gstatic.com/onebox/weather/48/sunny_s_cloudy.png"
                  alt=""
                  class="forecast-icon "/>
              	<div class = "weather-forecast-temperatures">
                	<span class="max">18°</span> <span class="min"> 8°</span>
                </div>          
	</div>`;
    // forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
  });
  forecastHTML = forecastHTML + `</div>`;
}

function currentWeather(response) {


  celsiusTemp = Math.round(response.data.temperature.current);
 let  cityName = response.data.city;
  let iconElement = document.querySelector("#current-icon");
  let descriptionElement = document.querySelector("#description");
  let windElement = document.querySelector("#wind-speed");
  let humidityElement = document.querySelector("#humidity");
  let temperatureElement = document.querySelector("#current-temp");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  descriptionElement.innerHTML = response.data.condition.description;
  iconElement.setAttribute("src", response.data.condition.icon_url);
  iconElement.setAttribute("alt", response.data.condition.icon);


let forecastCity = cityName;
let forecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${forecastCity}&key=${apiKey}$units=metric`;
axios.get(forecastUrl).then(displayForecast);
}
let celsiusTemp = null;

let city = "Polokwane";
let apiKey = "b4b16ao0bed60a37cdt0a5dcdf865c3b";
let currentUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
axios.get(currentUrl).then(currentWeather);



function fahrenheitTemp(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheit = (celsiusTemp * 9) / 5 + 32;
  let fahrenheitElement = document.querySelector("#current-temp");
  fahrenheitElement.innerHTML = Math.round(fahrenheit);
}

let fahrenheitLink = document.querySelector("#imperial");
fahrenheitLink.addEventListener("click", fahrenheitTemp);

function celsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let celsiusElement = document.querySelector("#current-temp");
  celsiusElement.innerHTML = celsiusTemp;
}

let celsiusLink = document.querySelector("#metric");
celsiusLink.addEventListener("click", celsiusTemperature);

function currentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let currentLocationUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}`;
  axios.get(currentLocationUrl).then(currentWeather);
}

function getCurrentPosition(event) {
  navigator.geolocation.getCurrentPosition(currentLocation);
}
let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener("click", getCurrentPosition);

function searchSubmit(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#search-input");
  let newCity = searchCity.value;
  let searchUrl = `https://api.shecodes.io/weather/v1/current?query=${newCity}&key=${apiKey}`;
  axios.get(searchUrl).then(currentWeather);
}

let searchButton = document.querySelector("#search-submit");
searchButton.addEventListener("click", searchSubmit);
