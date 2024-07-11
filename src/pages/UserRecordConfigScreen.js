// src/pages/UserRecordConfigScreen.js

import { Box } from "@mui/material";
import React, { useContext } from "react";
import CustomBreadCrumb from "../components/CustomBreadCrumb";
import PageTitle from "../components/PageTitle";
import { PATHS } from "../constants";
import AuthContext from "../context/auth.context";
import useAuthNavigation from "../hooks/useAuthNavigation";
const UserRecordConfigScreen = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const naviagte = useAuthNavigation(isLoggedIn, PATHS.USER_RECORD_CONFIG);
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <PageTitle title="User Record Configuration" />
      <CustomBreadCrumb
        paths={[
          {
            title: "User Records Configuration",
            icon: <></>,
          },
        ]}
      />
    </Box>
  );
};

export default UserRecordConfigScreen;
