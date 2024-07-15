// src/pages/HomeScreen.js

import React, { useContext } from 'react';

import { PATHS } from '../constants';
import AuthContext from '../context/auth.context';
import useAuthNavigation from '../hooks/useAuthNavigation';
const HomeScreen = () => {
  const { isLoggedIn } = useContext(AuthContext);
  useAuthNavigation(isLoggedIn, PATHS.DASHBOARD);
  return <></>;
};

export default HomeScreen;
