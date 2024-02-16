"use strict";

const apiKey = "7f0a8492114966345169cb1a198e9c30";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const weatherIcon = document.getElementById("weather-icon");

async function CheckWeather(city) {
  const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
  const data = await response.json();
  if (response.status == 404) {
    document.getElementById("error-message").style.display = "block";
    document.getElementById("weather").style.display = "none";
  } else {
    const weatherIconMap = {
      Clouds: "clouds",
      Clear: "clear",
      Rain: "rain",
      Drizzle: "drizzle",
      Mist: "mist",
    };

    const weatherMain = data.weather[0].main;
    const iconFileName = weatherIconMap[weatherMain] || "unknown";

    document.getElementById("city").innerHTML = data.name;
    document.getElementById("temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.getElementById("humidity").innerHTML = data.main.humidity + "%";
    document.getElementById("wind-speed").innerHTML = data.wind.speed + " km/h";
    document.getElementById("weather-icon").src = `images/${iconFileName}.png`;

    document.getElementById("weather").style.display = "block";
    document.getElementById("error-message").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  CheckWeather(searchBox.value);
});
