const openWeatherApp = {
  BASE_URL: "https://api.openweathermap.org/data/2.5/weather?q",
  SECRET_KEY: "e34fc1d577031781ef4a242ca3968065",
};

const weatherData = async (address) => {
  try {
    const url =
      openWeatherApp.BASE_URL +
      "=" +
      encodeURIComponent(address) +
      "&appid=" +
      openWeatherApp.SECRET_KEY;
    console.log(url);
    const response = await fetch(url);
    console.log(response);

    if (!response.ok) {
      throw new Error(`failed to fetch data ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`its an error ${error.message}`);
  }
};

module.exports = weatherData;
