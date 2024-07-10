import { Box, Typography } from "@mui/material";
import React, { useContext } from "react";
import { PATHS } from "../constants";
import AuthContext from "../context/auth.context";
import useAuthNavigation from "../hooks/useAuthNavigation";

const DoctorsScreen = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const naviagte = useAuthNavigation(isLoggedIn, PATHS.DOCTORS);
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Doctors
      </Typography>
    </Box>
  );
};

export default DoctorsScreen;
