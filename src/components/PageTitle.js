// src/components/PageTitle.js

import { Typography } from "@mui/material";
import React from "react";

const PageTitle = ({ title }) => {
  return (
    <Typography variant="h4" gutterBottom>
      {title}
    </Typography>
  );
};

export default PageTitle;
