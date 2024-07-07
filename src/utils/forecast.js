import axios from "axios";

// WEATHER FUNCTION
export const getForecast = ({ lat, lon } = {}, callback) => {
  axios.defaults.baseURL = "https://api.open-meteo.com/v1/bom";
  const url = `?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max&timezone=Australia/Sydney`;

  axios(url)
    .then((response) => {
      // console.log(response);
      if (response.data && response.data?.daily.time.length > 0) {
        // handle success
        const { temperature_2m_max: tempMax, precipitation_probability_max: rainChance } =
          response.data.daily; // destructure the data object, rename the keys
        const message = `Today we are expecting a top temperature of ${tempMax[0]}C with a ${rainChance[0]}% chance of rain`;
        callback(undefined, message);
      } else {
        // handle error if no data is returned
        const errorMessage = "No weather data found for selected location";
        callback(errorMessage, undefined);
      }
    })
    .catch((error) => {
      // handle error
      const errorMessage = "Unable to connect to weather service";
      callback(errorMessage, undefined);
    });
};
