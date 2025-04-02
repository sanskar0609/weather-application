import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

const Navbar = () => {
  const logoRef = useRef(null);

  useEffect(() => {
    gsap.to(logoRef.current, {
      rotation: 360,
      duration: 5,
      repeat: -1,
      ease: 'linear',
    });
  }, []);

  return (
    <AppBar position="static" className="bg-green-600">
      <Toolbar className="flex justify-between items-center">
        <Box className="flex items-center space-x-2">
          <WbSunnyIcon ref={logoRef} className="text-yellow-400" fontSize="large" />
          <Typography variant="h6">Weather Forecast</Typography>
        </Box>
        <Typography variant="h6" className="text-white">
          25°C | Sunny
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
