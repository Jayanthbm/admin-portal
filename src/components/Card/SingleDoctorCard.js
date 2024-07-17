// src/components/Card/SingleDoctorCard.js

import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmailIcon from '@mui/icons-material/Email';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { Box, Tooltip, Typography } from '@mui/material';
import React from 'react';

import { InfoRow, StyledCard1, StyledCardContent } from './StyledCard';
const SingleDoctorCard = ({ doctor }) => {
  return (
    <StyledCard1 sx={{ cursor: 'default' }}>
      <StyledCardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Tooltip title="Email">
            <InfoRow>
              <EmailIcon color="primary" />
              <Typography variant="body1" color="text.secondary">
                {doctor.email}
              </Typography>
            </InfoRow>
          </Tooltip>
          <Tooltip title="Speciality">
            <InfoRow>
              <LocalHospitalIcon color="primary" />
              <Typography variant="body1" color="text.secondary">
                {doctor.specialty}
              </Typography>
            </InfoRow>
          </Tooltip>
          <Tooltip title="Created at">
            <InfoRow>
              <CalendarTodayIcon color="primary" />
              <Typography variant="body1" color="text.secondary">
                {doctor.created_at}
              </Typography>
            </InfoRow>
          </Tooltip>
          <Tooltip title="Reg No">
            <InfoRow>
              <VerifiedUserIcon color="primary" />
              <Typography variant="body1" color="text.secondary">
                {doctor.medical_registration_number}
              </Typography>
            </InfoRow>
          </Tooltip>
          <Tooltip>
            <InfoRow>
              {doctor.enabled === 1 ? (
                <CheckCircleIcon color="success" />
              ) : (
                <CancelIcon color="error" />
              )}
              <Typography variant="body1">
                {doctor.enabled === 1 ? 'Active' : 'Inactive'}
              </Typography>
            </InfoRow>
          </Tooltip>
        </Box>
      </StyledCardContent>
    </StyledCard1>
  );
};

export default SingleDoctorCard;
