// src/routes/AppRoutes.js

import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { PATHS } from '../constants';
import useAuth from '../hooks/useAuth';
import AdminsScreen from '../pages/AdminsScreen';
import DashboardScreen from '../pages/DashboardScreen';
import DoctorScreen from '../pages/DoctorScreen';
import DoctorsScreen from '../pages/DoctorsScreen';
import LoginScreen from '../pages/LoginScreen';
import SpecialtiesScreen from '../pages/SpecialtiesScreen';
import SubscriptionsScreen from '../pages/SubscriptionsScreen';
import SubSpecialtyScreen from '../pages/SubSpecialtyScreen';
import UserRecordConfigScreen from '../pages/UserRecordConfigScreen';
import { ProtectedRoute } from './ProtectedRoute';

const Checker = () => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return <Navigate to={PATHS.LOGIN} />;
  } else {
    return <Navigate to={PATHS.DASHBOARD} />;
  }
};

const Logout = () => {
  const { handleLogout } = useAuth();
  useEffect(() => {
    handleLogout();
  }, [handleLogout]);

  return <Navigate to={PATHS.ROOT} />;
};
const AppRoutes = () => {
  return (
    <Routes>
      <Route path={PATHS.ROOT} element={<Navigate to={PATHS.LOGIN} />} />
      <Route path={PATHS.LOGIN} element={<LoginScreen />} />
      <Route
        path={PATHS.DASHBOARD}
        element={
          <ProtectedRoute>
            <DashboardScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path={PATHS.DOCTORS}
        element={
          <ProtectedRoute>
            <DoctorsScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path={PATHS.DOCTORS + '/:id'}
        element={
          <ProtectedRoute>
            <DoctorScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path={PATHS.SPECIALTIES}
        element={
          <ProtectedRoute>
            <SpecialtiesScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path={PATHS.SPECIALTIES + '/:id'}
        element={
          <ProtectedRoute>
            <SubSpecialtyScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path={PATHS.USER_RECORD_CONFIG}
        element={
          <ProtectedRoute>
            <UserRecordConfigScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path={PATHS.ADMINS}
        element={
          <ProtectedRoute>
            <AdminsScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path={PATHS.SUBSCRIPTIONS}
        element={
          <ProtectedRoute>
            <SubscriptionsScreen />
          </ProtectedRoute>
        }
      />
      <Route path="/logout" element={<Logout />} />
      <Route path="*" element={<Checker />} />
    </Routes>
  );
};

export default AppRoutes;
