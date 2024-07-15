// src/components/NoDataCard.js

import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import React from 'react';

import { ReactComponent as NoDataIcon } from '../../assets/no-data-icon.svg'; // Adjust the path to your SVG

const NoDataCard = ({
  title = 'No data found',
  buttonTitle = 'Add',
  onAdd,
}) => {
  return (
    <Card sx={{ margin: 'auto', mt: 4 }}>
      <CardContent>
        <Box textAlign="center" mb={2}>
          <NoDataIcon style={{ width: 50, height: 50, marginBottom: 16 }} />
          <Typography variant="h6" color="textSecondary">
            {title}
          </Typography>
        </Box>
        {onAdd && (
          <Box textAlign="center">
            <Button variant="contained" color="primary" onClick={onAdd}>
              {buttonTitle}
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default NoDataCard;
