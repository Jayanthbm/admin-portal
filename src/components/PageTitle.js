// src/components/PageTitle.js

import RefreshIcon from "@mui/icons-material/Refresh";
import { Box, Tooltip, Typography } from "@mui/material";
import React from "react";

const PageTitle = ({ title, onRefresh }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      {onRefresh && (
        <Tooltip title="Refresh">
          <Typography variant="h4" gutterBottom>
            <RefreshIcon
              fontSize="inherit"
              color="primary"
              onClick={onRefresh}
              sx={{
                cursor: "pointer",
              }}
            />
          </Typography>
        </Tooltip>
      )}
    </Box>
  );
};

export default PageTitle;
