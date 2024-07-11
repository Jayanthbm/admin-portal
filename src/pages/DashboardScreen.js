// src/pages/DashboardScreen.js

import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Box, Grid } from "@mui/material";
import React, { useContext, useState } from "react";

import CustomCard from "../components/CustomCard";
import PageTitle from "../components/PageTitle";
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

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <PageTitle title="Dashboard" />
      <Grid container spacing={3}>
        {/* Doctors Info */}
        <Grid item xs={12} sm={6} md={4}>
          <CustomCard
            title={"Total Doctors"}
            value={sampleData.doctors.totalDoctors}
            icon={
              <LocalHospitalIcon
                color="primary"
                fontSize="large"
                sx={{ fontSize: 60 }}
              />
            }
            isLoading={loading}
            isCountUp={true}
            buttonClick={() => naviagte(PATHS.DOCTORS)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CustomCard
            title={"Active Doctors"}
            value={sampleData.doctors.totalActive}
            icon={
              <LocalHospitalIcon
                color="primary"
                fontSize="large"
                sx={{ fontSize: 60 }}
              />
            }
            isLoading={loading}
            isCountUp={true}
            buttonClick={() => naviagte(PATHS.DOCTORS)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CustomCard
            title={"Inactive Doctors"}
            value={sampleData.doctors.totalInactive}
            icon={
              <LocalHospitalIcon
                color="primary"
                fontSize="large"
                sx={{ fontSize: 60 }}
              />
            }
            isLoading={loading}
            isCountUp={true}
            buttonClick={() => naviagte(PATHS.DOCTORS)}
          />
        </Grid>
        {/* Specialities Info */}
        <Grid item xs={12} sm={6} md={4}>
          <CustomCard
            title={"Total Specialities"}
            value={sampleData.specialities.totalSpecialities}
            icon={
              <LocalOfferIcon
                color="primary"
                fontSize="large"
                sx={{ fontSize: 60 }}
              />
            }
            isLoading={loading}
            isCountUp={true}
            buttonClick={() => naviagte(PATHS.SPECIALITIES)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CustomCard
            title={"Total Sub Specialities"}
            value={sampleData.specialities.totalSubSpecialities}
            icon={
              <LocalOfferIcon
                color="primary"
                fontSize="large"
                sx={{ fontSize: 60 }}
              />
            }
            isLoading={loading}
            isCountUp={true}
            buttonClick={() => naviagte(PATHS.SPECIALITIES)}
          />
        </Grid>

        {/* Admins Info */}
        <Grid item xs={12} sm={6} md={4}>
          <CustomCard
            title={"Total Admins"}
            value={sampleData.totalAdmins}
            icon={
              <PeopleAltIcon
                color="primary"
                fontSize="large"
                sx={{ fontSize: 60 }}
              />
            }
            isLoading={loading}
            isCountUp={true}
            buttonClick={() => naviagte(PATHS.ADMINS)}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardScreen;
