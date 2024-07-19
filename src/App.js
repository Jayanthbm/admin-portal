// src/App.js

import './App.css';

import React from 'react';

import AppHeader from './components/Layout/appHeader';
import MyFooter from './components/Layout/MyFooter';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  return (
    <>
      <AppHeader />
      <AppRoutes />
      <MyFooter />
    </>
  );
};

export default App;
