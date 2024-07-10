import React, { useContext } from "react";
import { PATHS } from "../constants";
import AuthContext from "../context/auth.context";
import useAuthNavigation from "../hooks/useAuthNavigation";
import { Box, Typography } from "@mui/material";
const SpecialitiesScreen = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const naviagte = useAuthNavigation(isLoggedIn, PATHS.SPECIALITIES);
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Specialities
      </Typography>
    </Box>
  );
};

export default SpecialitiesScreen;
