const apiKey = "6d86f80854e109d515bd71a4b8cb69d9";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const card = document.querySelector(".card");
const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city){
    const response = await fetch(apiUrl + city + "&appid=" + apiKey);
  var data = await response.json();
  console.log(data);

  if (data.cod === "404"){
    setDisplay(".error", "block")
    setDisplay(".weather", "none")
    return;
  }
  
  setDisplay(".error", "none")

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
    Haze: "images/mist.png",
    Fog: "images/mist.png" 
  }

  const weatherColors = {
    Clouds: "linear-gradient(135deg, #9c1ead, #5b548a)",
    Clear: "linear-gradient(135deg, #00feba, #5b548a)",
    Rain: "linear-gradient(135deg, #200b4f, #2e1e99)",
    Drizzle: "linear-gradient(135deg, #324ec2, #4333b0)",
    Snow: "linear-gradient(135deg, #bdc1d1, #64b9ca)",
    Haze: "linear-gradient(135deg, #6d7180, #083f4a)",
    Fog: "linear-gradient(135deg, #6d7180, #083f4a)"  
  }
  
  setDisplay(".weather", "block")
  
  const weatherCondition = data.weather[0].main;
  weatherIcon.src = weatherIcons[weatherCondition]
  card.style.background = weatherColors[weatherCondition];
}

function setDisplay(element, style)
{
  document.querySelector(element).style.display = style;
}

searchButton.addEventListener("click", ()=>{
  checkWeather(searchBox.value);
})
