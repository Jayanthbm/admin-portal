// src/components/LoadingScreen.js

import { Box, CircularProgress, Typography } from '@mui/material';
import React from 'react';

const LoadingScreen = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <CircularProgress />
      <Typography variant="h6" color="textSecondary" mt={2}>
        Loading...
      </Typography>
    </Box>
  );
};

export default LoadingScreen;
