// src/context/auth.context.js

import React, { createContext, useEffect, useState } from 'react';

import { REFRESH_KEY, TOKEN_KEY } from '../constants';
import { removeToken } from '../helpers/auth.helper';
import { isValidToken } from '../helpers/util.helper';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    removeToken(TOKEN_KEY);
    removeToken(REFRESH_KEY);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    async function init() {
      const token = localStorage.getItem('accessToken');
      if (token && isValidToken(token)) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }

    init();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
