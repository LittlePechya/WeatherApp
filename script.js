const apiKey = "6d86f80854e109d515bd71a4b8cb69d9";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input")
const searchButton = document.querySelector(".search button")
const weatherIcon = document.querySelector(".weather-icon")

async function checkWeather(city){
    const response = await fetch(apiUrl + city + "&appid=" + apiKey);
  var data = await response.json();
  console.log(data);

  if (data.cod === "404"){
    document.querySelector(".error").style.display = "block"
    document.querySelector(".weather").style.display = "none"
    return;
  }
  
  document.querySelector(".error").style.display = "none"

  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + "°c";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

  const weatherIcons ={
    Clouds: "images/clouds.png",
    Clear: "images/clear.png",
    Rain: "images/rain.png",
    Drizzle: "images/drizzle.png",
    Snow: "images/snow.png",
    Haze: "images/mist.png" 
  }

  document.querySelector(".weather").style.display = "block"
  weatherIcon.src = weatherIcons[data.weather[0].main]
}

searchButton.addEventListener("click", ()=>{
  checkWeather(searchBox.value);
})
