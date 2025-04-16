const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

const PORT = 3000;
const API_KEY ='7258f8e01667c4a604dea01c8bfab2be'; // Replace with your OpenWeather API key

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html for the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Weather API route
app.get('/weather', async (req, res) => {
  const city = req.query.city || 'London'; // Default city is London

  try {
const response = await axios.get(
  `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${encodeURIComponent(city)}`
);
const data = response.data;
res.json({
  city: data.location.name,
  temperature: data.current.temperature + '°C',
  description: data.current.weather_descriptions[0],
});



  }catch (error) {
  console.error('Error fetching weather data:', error.response?.data || error.message || error);
  res.status(500).json({ error: 'Failed to fetch weather data' });
}

});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

