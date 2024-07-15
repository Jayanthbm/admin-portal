// src/compoints/Card/DashboardCard.js

import { Divider, Typography } from '@mui/material';
import React from 'react';
import CountUp from 'react-countup';

import {
  InfoRow,
  StyledCard,
  StyledCardContent,
  StyledCardHeader,
} from './StyledCard';
const DashboardCard = ({ title, value, onNavigate }) => {
  return (
    <StyledCard sx={{ cursor: 'pointer', minWidth: 300 }} onClick={onNavigate}>
      <StyledCardHeader title={title} />
      <Divider />
      <StyledCardContent>
        <InfoRow>
          <Typography variant={'h3'}>
            <CountUp start={0} end={value} duration={2.5} separator="," />
          </Typography>
        </InfoRow>
      </StyledCardContent>
    </StyledCard>
  );
};

export default DashboardCard;
