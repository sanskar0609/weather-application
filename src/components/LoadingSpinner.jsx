import { CircularProgress, Box, Typography } from '@mui/material';

const LoadingSpinner = () => {
  return (
    <Box className="flex flex-col items-center justify-center py-12">
      <CircularProgress size={60} className="text-blue-500 mb-4" />
      <Typography variant="h6">Loading weather data...</Typography>
    </Box>
  );
};

export default LoadingSpinner;