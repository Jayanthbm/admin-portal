//src/components/Myfooter.js

import { Box } from '@mui/material';
import React from 'react';

const MyFooter = ({ mode }) => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      className="footer"
      sx={{ p: 6, backgroundColor: mode === 'dark' ? '#121212' : '#f1f1f1' }}
    >
      <center>© {currentYear} Your Company</center>
    </Box>
  );
};

export default MyFooter;
