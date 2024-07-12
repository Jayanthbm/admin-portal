// src/components/AddButton.js

import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
import React from "react";

const AddButton = ({ onClick, title, disabled }) => {
  return (
    <Box display="flex" justifyContent="flex-end" mb={2}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={onClick}
        disabled={disabled}
      >
        {title}
      </Button>
    </Box>
  );
};

export default AddButton;
