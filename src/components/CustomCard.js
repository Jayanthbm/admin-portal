// src/components/CustomCard.js

import AcUnitIcon from "@mui/icons-material/AcUnit";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Button,
  Card,
  CardContent,
  Grid,
  Skeleton,
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
  valueVariant = "h4",
  detailsText = "Details",
  valueToolTip,
}) => {
  icon = icon || (
    <AcUnitIcon color="primary" fontSize="large" sx={{ fontSize: 60 }} />
  );
  if (buttonClick === null || buttonClick === undefined) buttonClick = () => {};
  isLoading = isLoading || false;
  if (isCountUp === null || isCountUp === undefined) isCountUp = false;
  return (
    <Card sx={{ height: "100%", position: "relative" }}>
      <CardContent>
        <Grid container>
          {/* Left Side */}
          <Grid item container alignItems="center" xs={6}>
            {icon}
          </Grid>
          {/* Right Side */}
          {value && (
            <Grid item xs={6} sx={{ textAlign: "right" }}>
              <Tooltip title={valueToolTip}>
                <Typography variant={valueVariant}>
                  {isLoading ? (
                    <Skeleton
                      variant="text"
                      width={30}
                      height={50}
                      position="relative"
                      style={{ display: "inline-block" }}
                    />
                  ) : (
                    <>
                      {isCountUp ? (
                        <CountUp
                          start={0}
                          end={value}
                          duration={2.5}
                          separator=","
                        />
                      ) : (
                        value
                      )}
                    </>
                  )}
                </Typography>
              </Tooltip>
            </Grid>
          )}
        </Grid>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
          <Tooltip title={"Details"}>
            <Button onClick={buttonClick}>
              {detailsText}
              <ArrowForwardIcon />
            </Button>
          </Tooltip>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomCard;
