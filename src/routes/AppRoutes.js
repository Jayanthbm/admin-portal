// src/routes/AppRoutes.js

import React, { useContext, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { PATHS } from '../constants';
import AuthContext from '../context/auth.context';
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
  const { isLoggedIn } = useContext(AuthContext);
  if (!isLoggedIn) {
    return <Navigate to={PATHS.LOGIN} />;
  } else {
    return <Navigate to={PATHS.DASHBOARD} />;
  }
};

const Logout = () => {
  const { handleLogout } = useContext(AuthContext);
  useEffect(() => {
    handleLogout();
  }, [handleLogout]);

  return <Navigate to={PATHS.ROOT} />;
};
const AppRoutes = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <div
      className="body-container"
      style={{
        justifyContent: isLoggedIn ? 'flex-start' : 'space-around',
        marginRight: isLoggedIn ? '0px' : '240px',
      }}
    >
      <div className="main-content">
        <Routes>
          <Route
            path={PATHS.ROOT}
            element={<Checker isLoggedIn={isLoggedIn} />}
          />
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
      </div>
    </div>
  );
};

export default AppRoutes;
