let now = new Date();

function formatDate() {
  let date = now.getDate();
  if (date < 10) {
    date = `0${date}`;
  }
  let year = now.getFullYear();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];

  return `${day} ${date} ${month} ${year}`;
}

function formatHours() {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}
document.querySelector("h3").innerHTML = formatHours();
var apiKey = "d7ef075e23ceff7dd7b77b4367b2add8";

// button for location
function showPosition(position) {
  let lati = position.coords.latitude;
  let long = position.coords.longitude;

  let units = "metric";
  let apiKey = "d7ef075e23ceff7dd7b77b4367b2add8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${long}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lati}&lon=${long}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

navigator.geolocation.getCurrentPosition(showPosition);
let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);

function displayForecast(response) {
  let forecastElement = document.querySelector("#weatherDescription");
  forecastElement.innerHTML = description;
}

// city, temp, forecast

function search(event) {
  event.preventDefault();
  let input = document.querySelector("#search-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${input.value}`;
  let apiKey = "d7ef075e23ceff7dd7b77b4367b2add8";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${input.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}
let form = document.querySelector("form");
form.addEventListener("submit", search);

//button and search

function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`;
  let tempElement = document.querySelector("#tempNow");
  tempElement.innerHTML = `${temperature}`;

  let h2 = document.querySelector("h2");
  h2.innerHTML = `${formatDate(response.data.dt * 1000)}`;
  let newTime = `${formatHours(response.data.timezone)}`;
  document.querySelector("h3").innerHTML = newTime;

  celsiusTemperature = response.data.main.temp;

  let description = response.data.weather["0"].description;
  let wind = Math.round(response.data.wind.speed);
  let currentHumidity = response.data.main.humidity;
  humidity.innerHTML = `Humidity:  ${currentHumidity}%`;
  windspeed.innerHTML = `Windspeed:  ${wind}m/s`;
  weatherDescription.innerHTML = `${description}`;
}

// metric to imperial conversion
function metToImp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#tempNow");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  tempElement.innerHTML = fahrenheitTemperature;
}

function impToMet(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#tempNow");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  tempElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", impToMet);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", metToImp);
