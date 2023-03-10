function timeNow(response) {
  console.log(response.data.sys);
  console.log(response.data.sys.sunset);
  let now = new Date(response.data.dt * 1000);
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
  let timeAM = response.data.dt;
  let sunset = response.data.sys.sunset;
  let surise = response.data.sys.sunrise;
  let dusk = document.querySelector("body");
  if (timeAM >sunset) {
    dusk.classList.add("dark");
  }
  else{
    dusk.classList.add("day")
  }
}

function light(hour) {
  let dayTime = hour;
  if (dayTime > 18) {
    let bodyClass = document.querySelector("body");
    bodyClass.classList.add("night");
  } else {
    let bodyClass = document.querySelector("body");
    bodyClass.classList.add("daylight");
  }
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector(".weather-forecast");

  let forecastHTML = `<div class ="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        ` <div class="col-2"> 
        	<div class="weather-forecast-date">${formatDay(forecastDay.time)}</div>
		<img
                  src="${forecastDay.condition.icon_url}"
                  alt="${forecastDay.condition.description}"
                  class="forecast-icon"/>
              	<div class = "weather-forecast-temperatures">
                	<span class="max">${Math.round(
                    forecastDay.temperature.maximum
                  )}??</span> <span class=min> ${Math.round(
          forecastDay.temperature.minimum
        )}??</span>
                </div>          
	</div>`;
    }
    // forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
  });
  forecastHTML = forecastHTML + `</div>`;
}

function currentWeather(response) {
  celsiusTemp = Math.round(response.data.temperature.current);
  let cityName = response.data.city;
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
  let appWrapper = document.querySelector(".app-wrapper");
  if (response.data.temperature.current > 20) {
    appWrapper.classList.add("warm");
  } else {
    appWrapper.classList.add("cold");
  }

  let forecastCity = cityName;
  let forecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${forecastCity}&key=${apiKey}&units=metric`;
  axios.get(forecastUrl).then(displayForecast);

  let timeKey = "fea2efcd3e02d8f02338366e2c372f87";
  let currentTime = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${timeKey}`;
  axios.get(currentTime).then(timeNow);
}
let celsiusTemp = null;

let city = "Polokwane";
let apiKey = "b4b16ao0bed60a37cdt0a5dcdf865c3b";
let currentUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
axios.get(currentUrl).then(currentWeather);

//function fahrenheitTemp(event) {
//event.preventDefault();
//celsiusLink.classList.remove("active");
//fahrenheitLink.classList.add("active");
//let fahrenheit = (celsiusTemp * 9) / 5 + 32;
//let fahrenheitElement = document.querySelector("#current-temp");
//fahrenheitElement.innerHTML = Math.round(fahrenheit);
//}

//let fahrenheitLink = document.querySelector("#imperial");
//fahrenheitLink.addEventListener("click", fahrenheitTemp);

function celsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let celsiusElement = document.querySelector("#current-temp");
  celsiusElement.innerHTML = celsiusTemp;
}

//let celsiusLink = document.querySelector("#metric");
//celsiusLink.addEventListener("click", celsiusTemperature);

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
