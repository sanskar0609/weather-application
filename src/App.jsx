import { useState, useEffect, useCallback } from 'react';
import { Box, Container, Grid, Typography, Tabs, Tab } from '@mui/material';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyForecast';
import WeeklyForecast from './components/WeeklyForecast';
import ForecastChart from './components/ForecastChart';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import LoadingSpinner from './components/LoadingSpinner';
import useWeatherAPI from './hooks/useWeatherAPI';
import useGeolocation from './hooks/useGeolocation';

function App() {
  const [tabValue, setTabValue] = useState(0);
  const [location, setLocation] = useState('');
  const { coords, error: geoError } = useGeolocation();
  const { weatherData, forecastData, loading, error, fetchWeather } = useWeatherAPI();

  // Wrap fetchWeather in useCallback to avoid unnecessary re-renders
  const fetchWeatherMemoized = useCallback(fetchWeather, []);

  useEffect(() => {
    if (coords) {
      fetchWeatherMemoized(`${coords.latitude},${coords.longitude}`);
    }
  }, [coords, fetchWeatherMemoized]); // Only re-run when coords change

  const handleSearch = (searchLocation) => {
    setLocation(searchLocation);
    fetchWeatherMemoized(searchLocation);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <Navbar />
      <Container maxWidth="lg" className="py-8">
        <SearchBar onSearch={handleSearch} />

        {geoError && <Typography color="error" className="mt-4">Geolocation error: {geoError}</Typography>}
        {error && <Typography color="error" className="mt-4">Weather API error: {error}</Typography>}

        {loading ? (
          <LoadingSpinner />
        ) : weatherData ? (
          <>
            <CurrentWeather data={weatherData} />

            <Box className="mt-8">
              <Tabs value={tabValue} onChange={handleTabChange} centered>
                <Tab label="Hourly Forecast" />
                <Tab label="Weekly Forecast" />
                <Tab label="Temperature Trends" />
              </Tabs>

              <Box className="mt-4">
                {tabValue === 0 && <HourlyForecast data={forecastData?.forecastday[0]?.hour || []} />}
                {tabValue === 1 && <WeeklyForecast data={forecastData?.forecastday || []} />}
                {tabValue === 2 && <ForecastChart data={forecastData?.forecastday || []} />}
              </Box>
            </Box>
          </>
        ) : (
          <Typography variant="h6" className="mt-8 text-center">
            Search for a location to see weather data
          </Typography>
        )}
      </Container>
    </Box>
  );
}

export default App;
