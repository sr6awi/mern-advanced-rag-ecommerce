
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import MobileStepper from '@mui/material/MobileStepper';
import { Box, Typography, useTheme } from '@mui/material';
import { useState } from 'react';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export const ProductBanner = ({ images }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{
    width: '100%',
    height: { xs: '35vh', sm: '45vh', md: '60vh' }, 
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    }}>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        style={{ height: '100%' }}
      >
        {images.map((image, index) => (
          <Box key={index} sx={{
            width: '100%',
            height: '100%',
            position: 'relative'
          }}>
            {Math.abs(activeStep - index) <= 2 && (
              <>
                <Box
            component="img"
            src={image}
            alt={`Banner ${index}`}
    sx={{
             width: '100%',
             height: '100%',
             objectFit: 'cover',
             objectPosition: 'center',
             display: 'block',
             flexShrink: 0,       
              minHeight: '100%',    
              maxHeight: '100%'     
         }}
         />

                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6))',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Typography
                    variant="h2"
                    sx={{
                      color: 'white',
                      fontWeight: 'bold',
                      textShadow: '2px 2px 12px rgba(0,0,0,0.8)',
                      fontSize: { xs: '2rem', md: '3.5rem' },
                      textAlign: 'center',
                      px: 2
                    }}
                  >
                    Shop Smart, Shop CIU 🛒
                  </Typography>
                </Box>
              </>
            )}
          </Box>
        ))}
      </AutoPlaySwipeableViews>

      <Box sx={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)' }}>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          sx={{ background: 'transparent' }}
        />
      </Box>
    </Box>
  );
};
