const date = document.querySelector(".date");
let weatherIcon = document.querySelector(".weatherIcon");
let weatherInfo = document.querySelector(".weatherInfo");
let temperature = document.querySelector(".temperature");
let weatherCondition = document.querySelector(".weatherCondition");
let place = document.querySelector(".place");
const inputField = document.querySelector(".input-field");

function allClear() {
  weatherIcon.textContent = "";
  temperature.textContent = "Loading";
  weatherCondition.textContent = "";
  place.textContent = "";
}
allClear();
navigator.geolocation.getCurrentPosition(
  (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(latitude, longitude);
    // const yourUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=${1}&appid=e34fc1d577031781ef4a242ca3968065`;

    const yourUrl = `api?lat=${latitude}&lon=${longitude}`;
    // console.log(yourUrl);

    // const newUrl = `https://api.openweathermap.org/data/2.5/weather?q=lagos&appid=e34fc1d577031781ef4a242ca3968065`;
    fetchJson(yourUrl);
  },
  (error) => {
    console.log(`you came across an error${error}`);
  }
);

const now = new Date();
const options = { day: "2-digit", month: "short" };
date.textContent = new Intl.DateTimeFormat("en-us", options).format(now);

document
  .querySelector(".search-button")
  .addEventListener("click", function (e) {
    e.preventDefault();
    allClear();
    const url = `/api?q=${inputField.value}`;
    console.log(url);
    fetchJson(url);
  });

const fetchJson = async function (url) {
  try {
    const response = await fetch(url);
    console.log(response);
    const data = await response.json();
    console.log(data);
    if (data.name) {
      if (data.name) {
        const weatherType = data.weather[0].main;

        switch (weatherType) {
          case "Clouds":
            weatherIcon.className = "wi wi-day-cloudy custom-icon";
            break;
          case "Rain":
            weatherIcon.className = "wi wi-day-rain custom-icon";
            break;
          case "Clear":
            weatherIcon.className = "wi wi-night-clear custom-icon";
            break;
          case "Snow":
            weatherIcon.className = "wi wi-day-snow custom-icon";
            break;
          case "Thunderstorm":
            weatherIcon.className = "wi wi-day-thunderstorm custom-icon";
            break;
          case "Drizzle":
            weatherIcon.className = "wi wi-day-sprinkle custom-icon";
            break;
          case "Fog":
          case "Mist":
            weatherIcon.className = "wi wi-day-fog custom-icon";
            break;
          default:
            weatherIcon.className = "wi wi-na custom-icon"; // Default icon for unhandled weather
        }
      }

      temperature.textContent = (data.main.temp - 273.15).toFixed(2);
      weatherCondition.textContent = data.weather[0].main;
      place.textContent = data.name;
    } else {
      place.textContent = "City Not Found";
    }
  } catch (error) {
    console.error(error);
  }
};
