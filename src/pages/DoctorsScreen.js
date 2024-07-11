// src/pages/DoctorsScreen.js

import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { Box } from "@mui/material";
import React, { useContext } from "react";
import CustomBreadCrumb from "../components/CustomBreadCrumb";
import PageTitle from "../components/PageTitle";
import { PATHS } from "../constants";
import AuthContext from "../context/auth.context";
import useAuthNavigation from "../hooks/useAuthNavigation";
const DoctorsScreen = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useAuthNavigation(isLoggedIn, PATHS.DOCTORS);
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <PageTitle title="Doctors" />
      <CustomBreadCrumb
        paths={[
          {
            title: "Doctors",
            icon: <LocalHospitalIcon sx={{ mr: 0.5 }} fontSize="inherit" />,
          },
        ]}
      />
    </Box>
  );
};

export default DoctorsScreen;
