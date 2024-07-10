import React, { useContext } from "react";
import { PATHS } from "../constants";
import AuthContext from "../context/auth.context";
import useAuthNavigation from "../hooks/useAuthNavigation";
import { Box, Typography } from "@mui/material";
const HomeScreen = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const naviagte = useAuthNavigation(isLoggedIn, PATHS.DASHBOARD);
  return <div>HomeScreen</div>;
};

export default HomeScreen;
