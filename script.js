// "use strict";

let weather = {
  apiKey: "90d26827dd2d8b416f95f9953cd340ac",
  fetchWeather: async function (city) {
    // fetch(
    //   `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`
    // )
    //   .then((response) => {
    //     if (!response.ok) {
    //       alert("No weather found.");
    //       throw new Error("No weather found.");
    //     }
    //     return response.json();
    //   })
    //   .then((data) => this.displayWeather(data));

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`
    );
    if (!response.ok) {
      alert("No weather found.");
      throw new Error("No weather found.");
    }
    const data = await response.json();
    this.displayWeather(data);
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity, feels_like, temp_min, temp_max, pressure } =
      data.main;
    const { speed } = data.wind;

    document.querySelector(".city").innerText = `Weather in ${name}`;
    document.querySelector(
      ".icon"
    ).src = `https://openweathermap.org/img/wn/${icon}.png`;
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = `${Math.round(temp)}°C`;
    document.querySelector(".humidity").innerText = `Humidity: ${humidity} %`;
    document.querySelector(".wind").innerText = `Wind speed: ${speed} km/h`;
    document.querySelector(".weather").classList.remove("loading");
    document.querySelector(
      ".feels_like"
    ).innerText = `Temperature feels like: ${Math.round(feels_like)}°C`;
    document.querySelector(".temp_min").innerText = `Min temp: ${Math.round(
      temp_min
    )}°C`;
    document.querySelector(".temp_max").innerText = `Max temp: ${Math.round(
      temp_max
    )}°C`;
    document.querySelector(
      ".pressure"
    ).innerText = `pressure is ${pressure} hPa`;
    document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${name}')`;
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("London");

document.querySelector(".more_info").addEventListener("click", function () {
  document.querySelector(".animation").classList.toggle("hidden");
});
