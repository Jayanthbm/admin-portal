import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import AppHeader from "./components/appHeader";
import DashboardScreen from "./pages/DashboardScreen";
import DoctorsScreen from "./pages/DoctorsScreen";
import HomeScreen from "./pages/HomeScreen";
import LoginScreen from "./pages/LoginScreen";
import SpecialitiesScreen from "./pages/SpecialitiesScreen";
import UserRecordConfigScreen from "./pages/UserRecordConfigScreen";

const Checker = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/admin-portal");
  });
  return <div>Checker</div>;
};
const App = () => {
  return (
    <>
      <AppHeader />
      <Routes>
        <Route path="/" element={<Checker />} />
        <Route path="/admin-portal" element={<HomeScreen />} />
        <Route path="/admin-portal/login" element={<LoginScreen />} />
        <Route path="/admin-portal/dashboard" element={<DashboardScreen />} />
        <Route path="/admin-portal/doctors" element={<DoctorsScreen />} />
        <Route
          path="/admin-portal/specialities"
          element={<SpecialitiesScreen />}
        />
        <Route
          path="/admin-portal/user-record-config"
          element={<UserRecordConfigScreen />}
        />
      </Routes>
    </>
  );
};

export default App;
