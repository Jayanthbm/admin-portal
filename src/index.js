// src/index.js

import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { AuthProvider } from './context/auth.context';
import { SnackbarProvider } from './context/snackbar.context';
import { ViewProvider } from './context/view.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <SnackbarProvider>
      <BrowserRouter>
        <ViewProvider>
          <App />
        </ViewProvider>
      </BrowserRouter>
    </SnackbarProvider>
  </AuthProvider>
);
