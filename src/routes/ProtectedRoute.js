// src/routes/ProtectedRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';

import LeftMenu from '../components/Layout/leftMenu';
import LoadingScreen from '../components/LoadingScreen';
import { PATHS } from '../constants';
import useAuth from '../hooks/useAuth';

export const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isLoggedIn) {
    return <Navigate to={PATHS.LOGIN} />;
  }

  return (
    <>
      <div className="left-menu">
        <LeftMenu />
      </div>
      <div className="body-container">
        <div className="main-content">{children}</div>
      </div>
    </>
  );
};
