const apiKey = "0bb42f35b2caf66bc673a020f9646f53";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";
const searchbox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherPara = document.querySelector(".mainData");

async function checkWeather(city) {
  if (searchbox.value === "") {
    document.querySelector(".error p").innerHTML = "Please enter a City Name.";
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    return;
  }
  const response = await fetch(apiUrl + `&q=${city}&appid=${apiKey}`);

  if (response.status === 404) {
    document.querySelector(".error p").innerHTML =
      "Entered City doesn't exist.";
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    let data = await response.json();
    let dataMain = data.weather[0].main;

    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/hr";
    weatherPara.innerHTML = dataMain;

    if (dataMain === "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (dataMain === "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (dataMain === "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (dataMain === "Mist") {
      weatherIcon.src = "images/mist.png";
    } else if (dataMain === "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (dataMain === "Snow") {
      weatherIcon.src = "images/snow.png";
    } else if (dataMain === "Haze") {
      weatherIcon.src = "images/haze.png";
    } else if (dataMain === "Smoke") {
      weatherIcon.src = "images/smoke.png";
    } else {
      weatherIcon.src = "images/default.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchbox.value);
});
