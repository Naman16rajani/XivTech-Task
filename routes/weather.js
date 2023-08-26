var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET users listing. */
router.post('/', async function(req, res, next) {
  try {
    const { cities } = req.body;
    const weatherData = await getWeatherData(cities);

    res.json({ weather: weatherData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

async function getWeatherData(cities) {
  const apiKey = process.env.WEATHER_API; // Replace with your actual API key
  const weatherData = {};

  await Promise.all(
    cities.map(async (city) => {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
        );

        weatherData[city] = response.data.current.temp_c + 'C';
      } catch (error) {
        console.error(`Error fetching weather data for ${city}:`, error.message);
        weatherData[city] = 'N/A';
      }
    })
  );

  return weatherData;
}


module.exports = router;
