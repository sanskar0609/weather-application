import { Card, CardContent, Typography, Box } from '@mui/material';
import { formatDate, getWeatherIcon } from '../utils/helpers';

const WeeklyForecast = ({ data }) => {
  return (
    <Card className="bg-white rounded-lg shadow-md">
      <CardContent>
        <Typography variant="h6" className="font-bold mb-4">
          7-Day Forecast
        </Typography>
        
        <Box className="space-y-3">
          {data.map((day, index) => (
            <Box key={index} className="flex items-center justify-between">
              <Typography className="w-32">
                {index === 0 ? 'Today' : formatDate(day.date)}
              </Typography>
              
              <Box className="flex items-center">
                <Typography variant="h5" className="mx-2">
                  {getWeatherIcon(day.day.condition.code, true)}
                </Typography>
                <Typography className="text-sm w-24">
                  {day.day.condition.text}
                </Typography>
              </Box>
              
              <Box className="flex w-24 justify-end">
                <Typography className="font-medium mr-2">
                  {Math.round(day.day.maxtemp_c)}°
                </Typography>
                <Typography color="textSecondary">
                  {Math.round(day.day.mintemp_c)}°
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default WeeklyForecast;