import { Card, CardContent, Typography, Box } from '@mui/material';
import { formatTime, getWeatherIcon } from '../utils/helpers';

const HourlyForecast = ({ data }) => {
  return (
    <Card className="bg-white rounded-lg shadow-md">
      <CardContent>
        <Typography variant="h6" className="font-bold mb-4">
          Hourly Forecast
        </Typography>
        
        <Box className="flex overflow-x-auto pb-2">
          {data.map((hour, index) => (
            <Box key={index} className="flex-shrink-0 w-20 mx-2 text-center">
              <Typography variant="subtitle2">
                {formatTime(hour.time.split(' ')[1])}
              </Typography>
              <Typography variant="h5" className="my-1">
                {getWeatherIcon(hour.condition.code, hour.is_day)}
              </Typography>
              <Typography variant="h6">
                {Math.round(hour.temp_c)}°C
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default HourlyForecast;