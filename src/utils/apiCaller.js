import axios from 'axios';

const apiKey = 'ccbea1725b3ef06759ac746574674cea';
// Utils

// ----------------

export default async function apiCaller(country) {
  // Set default headers

  // Data preparation

  const fullConfig = {
    baseURL: `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${apiKey}`,
  };

  // Request

  try {
    const res = await axios(fullConfig);

    return res.data;
  } catch (err) {
    if (err.response) {

      throw err.response.data || err.response.statusText;
    }

    return Promise.reject(err);
  }
}
