// src/index.js

import './index.css';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { AuthProvider } from './context/auth.context';
import { SnackbarProvider } from './context/snackbar.context';
import { ViewProvider } from './context/view.context';
import theme from './theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        <BrowserRouter>
          <ViewProvider>
            <App />
          </ViewProvider>
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  </AuthProvider>
);
