import { useState, useEffect } from 'react';
import { cacheData, getCachedData } from '../utils/cache';

const API_KEY = '715bdbf3411649a59d5164955250204'; // Replace with your actual API key
const BASE_URL = 'http://api.weatherapi.com/v1';

const useWeatherAPI = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (location) => {
    setLoading(true);
    setError(null);
    
    try {
      // Check cache first
      const cachedWeather = getCachedData(`weather_${location}`);
      const cachedForecast = getCachedData(`forecast_${location}`);
      
      if (cachedWeather && cachedForecast) {
        setWeatherData(cachedWeather);
        setForecastData(cachedForecast);
        setLoading(false);
        return;
      }

      // Fetch current weather
      const weatherResponse = await fetch(
        `${BASE_URL}/current.json?key=${API_KEY}&q=${location}`
      );
      
      if (!weatherResponse.ok) {
        throw new Error('Failed to fetch weather data');
      }
      
      const weather = await weatherResponse.json();
      setWeatherData(weather);
      cacheData(`weather_${location}`, weather);

      // Fetch forecast
      const forecastResponse = await fetch(
        `${BASE_URL}/forecast.json?key=${API_KEY}&q=${location}&days=7`
      );
      
      if (!forecastResponse.ok) {
        throw new Error('Failed to fetch forecast data');
      }
      
      const forecast = await forecastResponse.json();
      setForecastData(forecast.forecast);
      cacheData(`forecast_${location}`, forecast.forecast);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { weatherData, forecastData, loading, error, fetchWeather };
};

export default useWeatherAPI;