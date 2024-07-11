// src/pages/SubSpecialityScreen.js

import CategoryIcon from "@mui/icons-material/Category";
import { Box } from "@mui/material";
import React, { useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import AddButton from "../components/AddButton";
import CustomBreadCrumb from "../components/CustomBreadCrumb";
import PageTitle from "../components/PageTitle";
import { PATHS } from "../constants";
import AuthContext from "../context/auth.context";
import useAuthNavigation from "../hooks/useAuthNavigation";
const SubSpecialityScreen = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const { id } = useParams();
  const { state } = useLocation();
  console.log("state", state);
  const naviagte = useAuthNavigation(isLoggedIn, PATHS.SPECIALITIES + "/" + id);
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <PageTitle title="Sub Specialities" />
      <CustomBreadCrumb
        paths={[
          {
            navigation: PATHS.SPECIALITIES,
            title: "Specalities",
            icon: <CategoryIcon sx={{ mr: 0.5 }} fontSize="inherit" />,
          },
          {
            title: "Sub Specalities",
            icon: <></>,
          },
        ]}
      />
      <AddButton onClick={() => {}} title="Add Sub Speciality" />
    </Box>
  );
};

export default SubSpecialityScreen;
