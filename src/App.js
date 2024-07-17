// src/App.js

import './App.css';

import React, { useContext, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import AppHeader from './components/Layout/appHeader';
import LeftMenu from './components/Layout/leftMenu';
import MyFooter from './components/Layout/MyFooter';
import { PATHS } from './constants';
import AuthContext from './context/auth.context';
import AdminsScreen from './pages/AdminsScreen';
import DashboardScreen from './pages/DashboardScreen';
import DoctorScreen from './pages/DoctorScreen';
import DoctorsScreen from './pages/DoctorsScreen';
import HomeScreen from './pages/HomeScreen';
import LoginScreen from './pages/LoginScreen';
import SpecialtiesScreen from './pages/SpecialtiesScreen';
import SubscriptionsScreen from './pages/SubscriptionsScreen';
import SubSpecialtyScreen from './pages/SubSpecialtyScreen';
import UserRecordConfigScreen from './pages/UserRecordConfigScreen';

const Checker = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(PATHS.DASHBOARD);
  }, [navigate]);
};

const Logout = () => {
  const navigate = useNavigate();
  const { handleLogout } = useContext(AuthContext);
  useEffect(() => {
    handleLogout();
    navigate(PATHS.LOGIN);
  }, [handleLogout, navigate]);
};
const App = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <>
      <AppHeader />
      <div
        className="body-container"
        style={{
          justifyContent: isLoggedIn ? 'flex-start' : 'space-around',
          marginRight: isLoggedIn ? '0px' : '240px',
        }}
      >
        {isLoggedIn && (
          <div className="left-menu">
            <LeftMenu />
          </div>
        )}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Checker />} />
            <Route path={PATHS.ROOT} element={<HomeScreen />} />
            <Route path={PATHS.LOGIN} element={<LoginScreen />} />
            <Route path={PATHS.DASHBOARD} element={<DashboardScreen />} />
            <Route path={PATHS.DOCTORS} element={<DoctorsScreen />} />
            <Route path={PATHS.DOCTORS + '/:id'} element={<DoctorScreen />} />
            <Route path={PATHS.SPECIALTIES} element={<SpecialtiesScreen />} />
            <Route
              path={PATHS.SPECIALTIES + '/:id'}
              element={<SubSpecialtyScreen />}
            />
            <Route
              path={PATHS.USER_RECORD_CONFIG}
              element={<UserRecordConfigScreen />}
            />
            <Route path={PATHS.ADMINS} element={<AdminsScreen />} />
            <Route
              path={PATHS.SUBSCRIPTIONS}
              element={<SubscriptionsScreen />}
            />
            <Route path={PATHS.LOGOUT} element={<Logout />} />
            <Route path="*" element={<Checker />} />
          </Routes>
        </div>
      </div>
      <MyFooter />
    </>
  );
};

export default App;
