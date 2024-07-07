import { geocodeAddress } from "./utils/geocode.js";
import { getForecast } from "./utils/forecast.js";

export const getWeather = (req, res) => {
  // Must provide an address in query string, otherwise return error message
  // Access query string parameters using req.query
  if (!req.query.address) {
    return res.send({ error: "You must provide an address" });
  }

  // Extract the address from the query string
  const location = req.query.address;

  geocodeAddress(location, (error, geoData) => {
    if (error) {
      return res.send({ error });
    }

    getForecast(geoData, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forecastData,
        location: geoData,
        searchString: req.query.address,
      });
    });
  });
};
