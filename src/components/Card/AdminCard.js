// src/components/Card/AdminCard.js

import BadgeIcon from '@mui/icons-material/Badge';
import BlockIcon from '@mui/icons-material/Block';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import { Divider, IconButton, Tooltip, Typography } from '@mui/material';
import React from 'react';

import {
  InfoRow,
  StyledCard,
  StyledCardContent,
  StyledCardHeader,
} from './StyledCard';
const AdminCard = ({ item, onEdit, onDelete, onToggleStatus }) => {
  return (
    <StyledCard>
      <StyledCardHeader
        title={item.name}
        action={
          <>
            <Tooltip title={item.enabled === 0 ? 'Enable' : 'Disable'}>
              <IconButton
                onClick={() => onToggleStatus(item)}
                sx={{ pb: 1, pt: 1 }}
              >
                {item.enabled === 0 ? (
                  <CheckIcon color="success" />
                ) : (
                  <BlockIcon color="warning" />
                )}
              </IconButton>
            </Tooltip>
            <IconButton onClick={() => onEdit(item)} sx={{ pb: 1, pt: 1 }}>
              <Tooltip title="Edit">
                <EditIcon color="primary" />
              </Tooltip>
            </IconButton>
            <IconButton onClick={() => onDelete(item.id)} sx={{ pb: 1, pt: 1 }}>
              <Tooltip title="Delete">
                <DeleteIcon color="error" />
              </Tooltip>
            </IconButton>
          </>
        }
      />
      <Divider />
      <StyledCardContent>
        <InfoRow>
          <EmailIcon color="action" />
          <Typography variant="body1" color="text.secondary">
            {item.email}
          </Typography>
        </InfoRow>
        <InfoRow>
          <BadgeIcon color="action" />
          <Typography variant="body1" color="text.secondary">
            {item.name}
          </Typography>
        </InfoRow>
        <InfoRow>
          <CalendarTodayIcon color="action" />
          <Typography variant="body1" color="text.secondary">
            {item.created_at}
          </Typography>
        </InfoRow>
        <InfoRow>
          {item.enabled === 1 ? (
            <CheckCircleIcon color="success" />
          ) : (
            <CancelIcon color="error" />
          )}
          <Typography variant="body1">
            {item.enabled === 1 ? 'Active' : 'Inactive'}
          </Typography>
        </InfoRow>
      </StyledCardContent>
    </StyledCard>
  );
};

export default AdminCard;
