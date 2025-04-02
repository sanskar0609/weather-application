import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Switch,
  FormControlLabel,
  Box,
} from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { format, parseISO } from 'date-fns';

Chart.register(...registerables);

const API_KEY = '8dccecb5449a918ab5cc94ab1f21f83e'; // Replace with your OpenWeatherMap API key

function WeatherApp() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem('darkMode')) || false
  );

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const fetchWeather = async (location) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?${
          location ? `lat=${location.latitude}&lon=${location.longitude}` : `q=${city}`
        }&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
    } catch (err) {
      setError('Failed to fetch weather data. Please check your API key and city name.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchWeather();
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => fetchWeather(position.coords),
        () => setError('Could not retrieve location.')
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  const renderForecast = () => {
    if (!weatherData) return null;
    return weatherData.list.slice(0, 5).map((item) => (
      <Card key={item.dt} sx={{ backgroundColor: darkMode ? '#1e1e1e' : '#f5f5f5', color: darkMode ? '#fff' : '#000', m: 1, p: 1 }}>
        <CardContent>
          <Typography variant="subtitle2">
            {format(parseISO(item.dt_txt), 'EEE, HH:mm')}
          </Typography>
          <Typography variant="body2">
            {item.main.temp}°C, {item.weather[0].description}
          </Typography>
        </CardContent>
      </Card>
    ));
  };

  const renderTemperatureChart = () => {
    if (!weatherData) return null;
    const labels = weatherData.list.slice(0, 5).map((item) => format(parseISO(item.dt_txt), 'HH:mm'));
    const data = weatherData.list.slice(0, 5).map((item) => item.main.temp);

    const chartData = {
      labels,
      datasets: [
        {
          label: 'Temperature (°C)',
          data,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    };
    return <Line data={chartData} />;
  };

  return (
    <Box sx={{ p: 3, backgroundColor: darkMode ? '#121212' : '#fff', color: darkMode ? '#fff' : '#000', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom>
        Weather App
      </Typography>

      <FormControlLabel
        control={<Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />}
        label={darkMode ? 'Dark Mode' : 'Light Mode'}
      />

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6}>
          <TextField label="Enter City" variant="outlined" value={city} onChange={(e) => setCity(e.target.value)} fullWidth />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button variant="contained" color="primary" onClick={handleSearch} fullWidth>
            Search
          </Button>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button variant="contained" color="secondary" onClick={handleLocation} fullWidth>
            Use Location
          </Button>
        </Grid>
      </Grid>

      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}

      {weatherData && (
        <>
          <Typography variant="h5" className="mt-4">
            Current Temperature: {weatherData.list[0].main.temp}°C, {weatherData.list[0].weather[0].description}
          </Typography>

          <Typography variant="h6" className="mt-4">5-Hour Forecast:</Typography>
          <Grid container>{renderForecast()}</Grid>

          <Typography variant="h6" className="mt-4">Temperature Trend:</Typography>
          {renderTemperatureChart()}
        </>
      )}
    </Box>
  );
}

export default WeatherApp;
