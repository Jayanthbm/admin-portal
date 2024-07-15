// src/components/CustomSkeleton.js

import { Box, Skeleton } from '@mui/material';
import React from 'react';

const CustomSkeleton = () => {
  return (
    <>
      <Box
        sx={{
          mt: 5,
        }}
      >
        <Skeleton animation="wave" height={20} />
        <Skeleton animation="wave" height={20} />
        <Skeleton animation="wave" height={20} />
        <Skeleton animation="wave" height={20} />
        <Skeleton animation="wave" height={20} />
      </Box>
    </>
  );
};

export default CustomSkeleton;
