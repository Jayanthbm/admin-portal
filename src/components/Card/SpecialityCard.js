// src/components/Card/SpecialityCard.js

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Divider, IconButton, Tooltip, Typography } from '@mui/material';
import React from 'react';
import CountUp from 'react-countup';

import { StyledCard, StyledCardContent, StyledCardHeader } from './StyledCard';
const SpecialityCard = ({
  title,
  value,
  valueTitle,
  onEdit,
  onDelete,
  onNavigate,
}) => {
  return (
    <StyledCard>
      <StyledCardHeader
        title={title}
        action={
          <>
            <IconButton onClick={onEdit} sx={{ pb: 1, pt: 1 }}>
              <Tooltip title="Edit">
                <EditIcon color="primary" />
              </Tooltip>
            </IconButton>
            <IconButton onClick={onDelete} sx={{ pb: 1, pt: 1 }}>
              <Tooltip title="Delete">
                <DeleteIcon color="error" />
              </Tooltip>
            </IconButton>
          </>
        }
      />
      <Divider />
      <StyledCardContent sx={{ cursor: 'pointer' }} onClick={onNavigate}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant={valueTitle ? 'h5' : 'h3'}>
            {valueTitle ? (
              <>{valueTitle}</>
            ) : (
              <CountUp start={0} end={value} duration={2.5} separator="," />
            )}
          </Typography>
        </Box>
      </StyledCardContent>
    </StyledCard>
  );
};

export default SpecialityCard;
