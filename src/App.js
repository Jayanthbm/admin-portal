// src/App.js

import './App.css';

import { ThemeProvider } from '@emotion/react';
import { Box, createTheme, CssBaseline } from '@mui/material';
import React, { useEffect, useState } from 'react';

import AppAppBar from './components/AppAppBar';
import MyFooter from './components/Layout/MyFooter';
import myTheme from './myTheme';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  const [mode, setMode] = useState('light');
  const theme = createTheme(myTheme(mode));

  useEffect(() => {
    setMode(localStorage.getItem('theme') || 'light');
  }, []);
  const toggleColorMode = () => {
    setMode((prev) => {
      localStorage.setItem('theme', prev === 'light' ? 'dark' : 'light');
      return prev === 'light' ? 'dark' : 'light';
    });
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
        {/* <AppHeader /> */}
        <Box
          sx={{
            bgcolor: 'background.default',
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <AppRoutes />
          <MyFooter mode={mode} />
        </Box>
      </ThemeProvider>
    </>
  );
};

export default App;
