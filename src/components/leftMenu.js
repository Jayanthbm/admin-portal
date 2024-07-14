// src/components/leftMenu.js

import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CategoryIcon from "@mui/icons-material/Category";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PATHS } from "../constants";

const LeftMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: PATHS.DASHBOARD },
    { text: "Doctors", icon: <LocalHospitalIcon />, path: PATHS.DOCTORS },
    { text: "Specialities", icon: <CategoryIcon />, path: PATHS.SPECIALITIES },
    {
      text: "User Config",
      icon: <SettingsIcon />,
      path: PATHS.USER_RECORD_CONFIG,
    },
    {
      text: "Subscriptions",
      icon: <CurrencyRupeeIcon />,
      path: PATHS.SUBSCRIPTIONS,
    },
    {
      text: "Admins",
      icon: <AdminPanelSettingsIcon />,
      path: PATHS.ADMINS,
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          marginTop: "70px",
        },
      }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            selected={location.pathname === item.path}
            onClick={() => handleNavigation(item.path)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default LeftMenu;
