//src/components/PageLoader.js

import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';

const PageLoader = ({ loading }) => {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
      onClick={() => {}}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default PageLoader;
