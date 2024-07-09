import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import CountUp from "react-countup";

import { PATHS } from "../constants";
import AuthContext from "../context/auth.context";
import useAuthNavigation from "../hooks/useAuthNavigation";

const DashboardScreen = () => {
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);
  const naviagte = useAuthNavigation(isLoggedIn, PATHS.DASHBOARD);

  const sampleData = {
    doctors: {
      totalDoctors: 20,
      totalActive: 10,
      totalInactive: 10,
    },
    specialities: {
      totalSpecialities: 3,
      totalSubSpecialities: 10,
    },
    totalAdmins: 5,
  };

  const renderCard = (title, value, icon, screen) => (
    <Card sx={{ height: "100%", position: "relative" }}>
      <CardContent>
        <Grid container>
          {/* Left Side */}
          <Grid item container alignItems="center" xs={6}>
            {icon === "doctor" && (
              <LocalHospitalIcon
                color="primary"
                fontSize="large"
                sx={{ fontSize: 60 }}
              />
            )}
            {icon === "speciality" && (
              <LocalOfferIcon
                color="primary"
                fontSize="large"
                sx={{ fontSize: 60 }}
              />
            )}
            {icon === "admin" && (
              <PeopleAltIcon
                color="primary"
                fontSize="large"
                sx={{ fontSize: 60 }}
              />
            )}
          </Grid>
          {/* Right Side */}
          <Grid item xs={6} sx={{ textAlign: "right" }}>
            <Typography variant="h4">
              {loading ? (
                <Skeleton
                  variant="text"
                  width={30}
                  height={50}
                  position="relative"
                  style={{ display: "inline-block" }}
                />
              ) : (
                <CountUp start={0} end={value} duration={2.5} separator="," />
              )}
            </Typography>
          </Grid>
        </Grid>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
          <Tooltip title={`Navigate to ${icon} screen`}>
            <Button onClick={() => naviagte(screen)}>
              Details
              <ArrowForwardIcon />
            </Button>
          </Tooltip>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Doctors Info */}
        <Grid item xs={12} sm={6} md={4}>
          {renderCard(
            "Total Doctors",
            sampleData.doctors.totalDoctors,
            "doctor",
            PATHS.DOCTORS
          )}
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          {renderCard(
            "Active Doctors",
            sampleData.doctors.totalActive,
            "doctor",
            PATHS.DOCTORS
          )}
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          {renderCard(
            "Inactive Doctors",
            sampleData.doctors.totalInactive,
            "doctor",
            PATHS.DOCTORS
          )}
        </Grid>
        {/* Specialities Info */}
        <Grid item xs={12} sm={6} md={4}>
          {renderCard(
            "Total Specialities",
            sampleData.specialities.totalSpecialities,
            "speciality",
            PATHS.SPECIALITIES
          )}
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          {renderCard(
            "Total Sub Specialities",
            sampleData.specialities.totalSubSpecialities,
            "speciality",
            PATHS.SPECIALITIES
          )}
        </Grid>

        {/* Admins Info */}
        <Grid item xs={12} sm={6} md={4}>
          {renderCard(
            "Total Admins",
            sampleData.totalAdmins,
            "admin",
            PATHS.ADMINS
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardScreen;
