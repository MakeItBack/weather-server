import axios from "axios";
import { encode } from "urlencode";

// GEOCODING FUNCTION
export const geocodeAddress = (address, callback) => {
  const encodedAddress = encode(address);
  const geocodeURL = `https://geocode.maps.co/search?api_key=667fddc5813f5553256470yzrd7e452&q=${encodedAddress}`;
  axios(geocodeURL)
    .then((response) => {
      if (response.data && response.data?.length > 0) {
        // handle success
        const { lat, lon, display_name } = response.data[0]; // destructure the data object

        callback(undefined, { lat, lon, name: display_name });
      } else {
        // handle error if no data is returned
        callback("No address lat/lon data found", undefined);
      }
    })
    // handle error
    .catch((error) => {
      callback("Unable to connect to geocode API", undefined);
    });
};
