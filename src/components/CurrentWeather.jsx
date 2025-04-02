import { Card, CardContent, Typography, Box } from '@mui/material';
import { getWeatherIcon } from '../utils/helpers';

const CurrentWeather = ({ data }) => {
  const { current, location } = data;

  return (
    <Card className="bg-white rounded-lg shadow-md">
      <CardContent>
        <Box className="flex flex-col md:flex-row justify-between items-center">
          <Box>
            <Typography variant="h4" className="font-bold">
              {location.name}, {location.country}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {new Date(location.localtime).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              })}
            </Typography>
            <Typography variant="h5" className="mt-2">
              {current.condition.text}
            </Typography>
          </Box>
          
          <Box className="flex items-center mt-4 md:mt-0">
            <Typography variant="h1" className="mr-4">
              {Math.round(current.temp_c)}°C
            </Typography>
            <Typography variant="h2">
              {getWeatherIcon(current.condition.code, current.is_day)}
            </Typography>
          </Box>
        </Box>
        
        <Box className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <WeatherDetail label="Feels Like" value={`${Math.round(current.feelslike_c)}°C`} />
          <WeatherDetail label="Humidity" value={`${current.humidity}%`} />
          <WeatherDetail label="Wind" value={`${current.wind_kph} km/h`} />
          <WeatherDetail label="UV Index" value={current.uv} />
        </Box>
      </CardContent>
    </Card>
  );
};

const WeatherDetail = ({ label, value }) => (
  <Box className="bg-blue-50 p-3 rounded-lg">
    <Typography variant="subtitle2" color="textSecondary">
      {label}
    </Typography>
    <Typography variant="h6">{value}</Typography>
  </Box>
);

export default CurrentWeather;