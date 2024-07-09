import { Layout } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../constants";

const { Header } = Layout;
const AppHeader = ({ title }) => {
  const navigate = useNavigate();
  title = title || "Admin Dashboard";
  return (
    <>
      <Header className="app-header">
        {title}
        <button onClick={() => navigate(PATHS.DOCTORS)}>Doctor</button>
        <button onClick={() => navigate(PATHS.SPECIALITIES)}>
          Specialities
        </button>
        <button onClick={() => navigate(PATHS.USER_RECORD_CONFIG)}>
          User Record Config
        </button>
      </Header>
    </>
  );
};

export default AppHeader;
