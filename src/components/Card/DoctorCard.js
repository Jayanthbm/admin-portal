// src/components/Card/DoctorCard.js

import BlockIcon from '@mui/icons-material/Block';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { Divider, IconButton, Tooltip, Typography } from '@mui/material';
import React from 'react';

import {
  InfoRow,
  StyledCard,
  StyledCardContent,
  StyledCardHeader,
} from './StyledCard';

const DoctorCard = ({
  doctor,
  onEdit,
  onDelete,
  onToggleStatus,
  onNavigate,
}) => {
  return (
    <StyledCard>
      <StyledCardHeader
        title={doctor.name}
        action={
          <>
            <IconButton
              onClick={() => onToggleStatus(doctor)}
              sx={{ pb: 1, pt: 1 }}
            >
              <Tooltip title={doctor.enabled === 0 ? 'Enable' : 'Disable'}>
                {doctor.enabled === 0 ? (
                  <CheckIcon color="success" />
                ) : (
                  <BlockIcon color="warning" />
                )}
              </Tooltip>
            </IconButton>
            <IconButton onClick={() => onEdit(doctor)} sx={{ pb: 1, pt: 1 }}>
              <Tooltip title="Edit">
                <EditIcon color="primary" />
              </Tooltip>
            </IconButton>
            <IconButton
              onClick={() => onDelete(doctor.id)}
              sx={{ pb: 1, pt: 1 }}
            >
              <Tooltip title="Delete">
                <DeleteIcon color="error" />
              </Tooltip>
            </IconButton>
          </>
        }
      />
      <Divider />
      <StyledCardContent sx={{ cursor: 'pointer' }} onClick={onNavigate}>
        <InfoRow>
          <EmailIcon color="action" />
          <Typography variant="body1" color="text.secondary">
            {doctor.email}
          </Typography>
        </InfoRow>
        <InfoRow>
          <LocalHospitalIcon color="action" />
          <Typography variant="body1" color="text.secondary">
            {doctor.speciality}
          </Typography>
        </InfoRow>
        <InfoRow>
          <CalendarTodayIcon color="action" />
          <Typography variant="body1" color="text.secondary">
            {doctor.created_at}
          </Typography>
        </InfoRow>
        <InfoRow>
          <VerifiedUserIcon color="action" />
          <Typography variant="body1" color="text.secondary">
            {doctor.medical_registration_number}
          </Typography>
        </InfoRow>

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
      </StyledCardContent>
    </StyledCard>
  );
};

export default DoctorCard;
