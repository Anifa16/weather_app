const form = document.forms["weather"];

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const cityInput = form.querySelector('[name="city"]');
  const city = cityInput.value;

  const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=328dd91e2afb1c2740d935070090b7a2`)
    .then(response => response.json());

  displayweather(data);
});

const displayweather = (data) => {
  const {name} = data;
  const {description, icon} = data.weather[0];
  const {temp, humidity} = data.main;
  const {speed} = data.wind;

  document.querySelector(".city").innerText = "Weather in " + name;
  document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"+icon+".png";
  document.querySelector(".date").innerText = new Date().toLocaleDateString();
  document.querySelector(".temp").innerText = Math.ceil((temp - 273.15) * 9/5 + 32) + "°F";
  document.querySelector(".description").innerText = description;
  let image;
  switch (description) {
    case "sunny":
      image = 'url(/images/sunny.jpg)';
      break;
    case "cloudy":
      image = 'url(/images/cloudy.gif)';
      break;
    case "snow":
      image = 'url(/images/snow.gif)';
      break;
    case "rain":
      image = 'url(/images/rain.gif)';
      break;
    default:
      image = '';
      break;
  }
  document.querySelector(".contianer").style.backgroundImage = image;
  document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
  document.querySelector(".wind").innerText = "Wind Speed: " + speed + "km/h";

  document.body.style.backgroundImage = `url("https://source.unsplash.com/1600x900/?${name}")`;  
};




