const date = document.querySelector(".date");
let weatherIcon = document.querySelector(".weatherIcon");
let weatherInfo = document.querySelector(".weatherInfo");
let temperature = document.querySelector(".temperature");
let weatherCondition = document.querySelector(".weatherCondition");
let place = document.querySelector(".place");
const inputField = document.querySelector(".input-field");

navigator.geolocation.getCurrentPosition(
  (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(latitude, longitude);
    const yourUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=${1}&appid=e34fc1d577031781ef4a242ca3968065`;
    console.log(yourUrl);

    const newUrl = `https://api.openweathermap.org/data/2.5/weather?q=lagos&appid=e34fc1d577031781ef4a242ca3968065`;
    fetchJson(newUrl);
  },
  (error) => {
    console.log("you came across an error");
  }
);
function allClear() {
  weatherIcon.textContent = "";
  temperature.textContent = "";
  weatherCondition.textContent = "";
  place.textContent = "";
}

const now = new Date();
const options = { day: "2-digit", month: "short" };
date.textContent = new Intl.DateTimeFormat("en-us", options).format(now);

document
  .querySelector(".search-button")
  .addEventListener("click", function (e) {
    e.preventDefault();
    allClear();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputField.value}&appid=e34fc1d577031781ef4a242ca3968065`;
    fetchJson(url);
  });

const fetchJson = async function (url) {
  try {
    const response = await fetch(url);
    console.log(response);
    const data = await response.json();
    console.log(data);
    if (data.name) {
      weatherIcon.className = "wi wi-day-cloudy custom-icon";
      temperature.textContent = data.main.temp;
      weatherCondition.textContent = data.weather[0].main;
      place.textContent = data.name;
    } else {
      place.textContent = "City Not Found";
    }
  } catch (error) {
    console.error(error);
  }
};
