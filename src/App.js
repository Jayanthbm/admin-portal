import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AppHeader from "./components/appHeader";
import DashboardScreen from "./pages/DashboardScreen";
import DoctorsScreen from "./pages/DoctorsScreen";
import HomeScreen from "./pages/HomeScreen";
import LoginScreen from "./pages/LoginScreen";
import SpecialitiesScreen from "./pages/SpecialitiesScreen";
import UserRecordConfigScreen from "./pages/UserRecordConfigScreen";
const App = () => {
  return (
    <>
      <AppHeader />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/dashboard" element={<DashboardScreen />} />
        <Route path="/doctors" element={<DoctorsScreen />} />
        <Route path="/specialities" element={<SpecialitiesScreen />} />
        <Route
          path="/user-record-config"
          element={<UserRecordConfigScreen />}
        />
      </Routes>
    </>
  );
};

export default App;
