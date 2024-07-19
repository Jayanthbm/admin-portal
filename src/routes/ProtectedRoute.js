// src/routes/ProtectedRoute.js

import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import LeftMenu from '../components/Layout/leftMenu';
import { PATHS } from '../constants';
import AuthContext from '../context/auth.context';

export const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  if (!isLoggedIn) {
    return <Navigate to={PATHS.LOGIN} />;
  }

  return (
    <>
      <div className="left-menu">
        <LeftMenu />
      </div>
      {children}
    </>
  );
};
