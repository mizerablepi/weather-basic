const key = "d1cc276ff3dd481e813133638230708";
const form = document.getElementById("form");
const baseURL = "http://api.weatherapi.com/v1/";

renderWeatherCard("mumbai");

form.addEventListener("submit", (event) => {
  const location = form.querySelector("#location").value.toLowerCase();

  renderWeatherCard(location);

  event.preventDefault();
});

async function getCurrentWeatherData(location) {
  const response = await fetch(
    baseURL + "current.json?key=" + key + "&q=" + location,
  );
  const data = await response.json();
  return data;
}

async function renderWeatherCard(location) {
  const data = await getCurrentWeatherData(location);

  const cardLocation = document.querySelector(".location");
  cardLocation.textContent = `${data.location.name}, ${data.location.country}`;

  const temperature = document.querySelector(".temperature");
  temperature.textContent = data.current.temp_c + " C";

  const condition = document.querySelector(".condition");
  condition.textContent = data.current.condition.text;

  const feelsLike = createExtraElement(
    `Feels Like: ${data.current.feelslike_c}`,
  );

  const wind = createExtraElement(`Wind: ${data.current.wind_kph}`);

  const cloud = createExtraElement(`Cloud: ${data.current.cloud}`);

  const extra = document.querySelector(".extra");
  extra.replaceChildren();
  extra.append(feelsLike, wind, cloud);
}

function createExtraElement(textContent) {
  const extraElement = document.createElement("div");
  extraElement.className = "extra-info";
  extraElement.textContent = textContent;

  return extraElement;
}
