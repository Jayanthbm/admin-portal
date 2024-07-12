// src/components/CustomCard.js

import AcUnitIcon from "@mui/icons-material/AcUnit";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Skeleton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import CountUp from "react-countup";
const CustomCard = ({
  title,
  value,
  icon,
  buttonClick,
  isLoading,
  isCountUp,
  valueVariant = "h3",
  valueToolTip,
  actions,
  editble,
  onEditChange,
}) => {
  icon = icon || (
    <AcUnitIcon color="primary" fontSize="large" sx={{ fontSize: 60 }} />
  );
  isLoading = isLoading || false;
  if (isCountUp === null || isCountUp === undefined) isCountUp = false;
  if (value === null || value === undefined) value = isCountUp ? 0 : "";
  return (
    <Card sx={{ height: "100%", position: "relative" }}>
      {editble ? (
        <TextField
          label="Speciality Name"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => onEditChange(e.target.value)}
        />
      ) : (
        <CardHeader title={title} sx={{ pb: 1 }} />
      )}

      <Divider />
      <CardContent>
        <Grid container justifyContent="center">
          {isLoading ? (
            <>
              <Skeleton animation="wave" width={150} height={20} />
              <Skeleton animation="wave" width={150} height={20} />
              <Skeleton animation="wave" width={150} height={20} />
            </>
          ) : (
            <Tooltip title={valueToolTip}>
              <Typography variant={valueVariant}>
                {isCountUp ? (
                  <CountUp start={0} end={value} duration={2.5} separator="," />
                ) : value ? (
                  value
                ) : (
                  icon
                )}
              </Typography>
            </Tooltip>
          )}
        </Grid>
      </CardContent>
      <Divider />
      <CardActions disableSpacing>
        {actions?.map((action, index) => (
          <Tooltip key={index} title={action.title}>
            <IconButton
              key={index}
              size="small"
              onClick={action.onClick}
              sx={{ cursor: action.disabled ? "not-allowed" : "pointer" }}
              disabled={action.disabled ? action.disabled : false}
            >
              {action.icon}
            </IconButton>
          </Tooltip>
        ))}
        {buttonClick && (
          <Tooltip title="More">
            <IconButton
              size="small"
              onClick={buttonClick}
              disabled={isLoading}
              sx={{ ml: "auto", cursor: isLoading ? "not-allowed" : "pointer" }}
            >
              <ArrowForwardIcon color={isLoading ? "disabled" : "primary"} />
            </IconButton>
          </Tooltip>
        )}
      </CardActions>
    </Card>
  );
};

export default CustomCard;
