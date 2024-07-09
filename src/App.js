import React, { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import AppHeader from "./components/appHeader";
import LeftMenu from "./components/leftMenu";
import { PATHS } from "./constants";
import AuthContext from "./context/auth.context";
import AdminsScreen from "./pages/AdminsScreen";
import DashboardScreen from "./pages/DashboardScreen";
import DoctorsScreen from "./pages/DoctorsScreen";
import HomeScreen from "./pages/HomeScreen";
import LoginScreen from "./pages/LoginScreen";
import SpecialitiesScreen from "./pages/SpecialitiesScreen";
import UserRecordConfigScreen from "./pages/UserRecordConfigScreen";

const Checker = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(PATHS.DASHBOARD);
  }, [navigate]);
};
const App = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <>
      <AppHeader />
      <div className="body-container">
        <div
          className="left-menu"
          style={isLoggedIn ? { display: "block" } : { display: "none" }}
        >
          <LeftMenu />
        </div>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Checker />} />
            <Route path={PATHS.ROOT} element={<HomeScreen />} />
            <Route path={PATHS.LOGIN} element={<LoginScreen />} />
            <Route path={PATHS.DASHBOARD} element={<DashboardScreen />} />
            <Route path={PATHS.DOCTORS} element={<DoctorsScreen />} />
            <Route path={PATHS.SPECIALITIES} element={<SpecialitiesScreen />} />
            <Route
              path={PATHS.USER_RECORD_CONFIG}
              element={<UserRecordConfigScreen />}
            />
            <Route path={PATHS.ADMINS} element={<AdminsScreen />} />
            <Route path="*" element={<Checker />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
