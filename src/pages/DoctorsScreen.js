import { Typography } from "@mui/material";
import React, { useContext } from "react";
import { PATHS } from "../constants";
import AuthContext from "../context/auth.context";
import useAuthNavigation from "../hooks/useAuthNavigation";

const DoctorsScreen = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const naviagte = useAuthNavigation(isLoggedIn, PATHS.DOCTORS);
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Doctors
      </Typography>
    </>
  );
};

export default DoctorsScreen;
