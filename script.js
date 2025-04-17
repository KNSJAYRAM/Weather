const API_KEY = "144d620ebf2e201af78a6c5d09fc3019";

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const errorMsg = document.getElementById("errorMsg");
  const weatherBox = document.getElementById("weatherBox");

  errorMsg.textContent = "";
  weatherBox.innerHTML = "";

  if (!city) {
    errorMsg.textContent = "Please enter a city name.";
    return;
  }

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "City not found");
    }

    const html = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p>${Math.round(data.main.temp)}°C</p>
      <p>${data.weather[0].description}</p>
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}" />
    `;
    weatherBox.innerHTML = html;
  } catch (error) {
    errorMsg.textContent = error.message;
  }
}
