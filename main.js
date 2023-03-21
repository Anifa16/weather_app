const form = document.forms["weather"];// coonect to my html form 

form.addEventListener("submit", async (event) => { // this here is submit eventlis
  event.preventDefault();

  const cityInput = form.querySelector('[name="city"]'); 
  const city = cityInput.value;

  const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`)
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
  switch (description) {
    case "sunny" || "clear sky":
      Image = 'url(/images/sunny.jpg)';
      break;
    case "cloudy" || "overcast clouds":
      Image = 'url(/images/cloudy.gif)';
      break;
    case "snow":
      Image = 'url(/images/snow.gif)';
      break;
    case "rain" ||'light rain':
      Image = 'url(/images/rain.gif)';
      break;
    default:
      Image = 'url(/images/rain.gif)';
      break;
  }
  document.querySelector(".contianer").style.backgroundImage = Image;
  document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
  document.querySelector(".wind").innerText = "Wind Speed: " + speed + "km/h";

  document.body.style.backgroundImage = `url("https://source.unsplash.com/1600x900/?${name}")`;  
};



  const quote = document.getElementById("quote");
  const author = document.getElementById("author");

  const api_url = 'https://api.quotable.io/random';

  async function getQuote(url) {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)

    quote.innerText = data.content;
    author.innerText = data.author;
  }

  getQuote(api_url);






