console.log("client-side JS file");

// NOTE: Axios is being loaded into the client side code using a script tag in the HTML file

// FETCHING DATA FROM THE SERVER

/* --------------------------------------------------------------------------------------------- */
// Example using Axios
axios.get("https://puzzle.mead.io/puzzle").then((response) => {
  console.log("Axios puzzle: ", response.data.puzzle);
});
// Example using Fetch
fetch("https://puzzle.mead.io/puzzle").then((response) => {
  response.json().then((data) => {
    console.log("Fetch puzzle: ", data.puzzle);
  });
});
/* --------------------------------------------------------------------------------------------- */

// Using Fetch and Axios to get the weather data
// const address = "Boston";

/* axios
  .get(`http://localhost:8080/forecastdata?address=${address}`)
  .then((response) => {
    if (response.data.error) {
      console.log("Axios error: ", response.data.error);
    } else {
      console.log("Axios weather: ", response.data);
    }
  })
  .catch((error) => {
    console.log("Error: ", error);
  }); */

/* fetch(`http://localhost:8080/forecastdata?address=${address}`).then((response) => {
  response.json().then((data) => {
    if (data.error) {
      console.log("Fetch error: ", data.error);
    } else {
      console.log("Fetch weather: ", data);
    }
  });
}); */
/* --------------------------------------------------------------------------------------------- */

const weatherForm = document.querySelector("form");
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");
const locationBlock = document.querySelector("#location-block");
const weatherBlock = document.querySelector("#weather-block");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchButton.disabled = true;
  const address = searchInput.value;
  locationBlock.textContent = "";
  weatherBlock.textContent = "Loading...";

  axios
    .get(`/forecastdata?address=${address}`)
    .then((response) => {
      if (response.data.error) {
        weatherBlock.textContent = response.data.error;
        searchButton.disabled = false;
      } else {
        locationBlock.textContent = response.data.location.name;
        weatherBlock.textContent = response.data.forecast;
        searchButton.disabled = false;
      }
    })
    .catch((error) => {
      weatherBlock.textContent = response.data.error;
      searchButton.disabled = false;
    });
});
