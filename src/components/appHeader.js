import { Layout } from "antd";
import React from "react";

const { Header } = Layout;
const AppHeader = ({ title }) => {
  title = title || "Admin Dashboard";
  return <Header className="app-header">{title}</Header>;
};

export default AppHeader;
