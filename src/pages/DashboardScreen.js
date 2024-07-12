// src/pages/DashboardScreen.js

import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Box, Grid } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

import CustomCard from "../components/CustomCard";
import PageTitle from "../components/PageTitle";
import { API_ENDPOINTS, PATHS } from "../constants";
import AuthContext from "../context/auth.context";
import { getItems } from "../helpers/api.handler";

import MyPageLayout from "../components/MyPageLayout";
import useAuthNavigation from "../hooks/useAuthNavigation";
const DashboardScreen = () => {
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useAuthNavigation(isLoggedIn, PATHS.DASHBOARD);
  const [dashboardData, setDashboardData] = useState(null);

  const fetchItems = async (force = false) => {
    return await getItems({
      url: API_ENDPOINTS.DASHBOARD,
      loadingFunction: setLoading,
      snackBarFunction: null,
      dataSetterState: setDashboardData,
      commonFunction: () => {},
      force: force,
      cachedKey: API_ENDPOINTS.DASHBOARD,
    });
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <PageTitle
        title="Dashboard"
        onRefresh={() => {
          fetchItems(true);
        }}
      />
      <Grid container spacing={3}>
        {/* Doctors Info */}
        <Grid item xs={12} sm={6} md={4}>
          <CustomCard
            title={"Total Doctors"}
            value={dashboardData && dashboardData?.doctors.totalDoctors}
            icon={
              <LocalHospitalIcon
                color="primary"
                fontSize="large"
                sx={{ fontSize: 60 }}
              />
            }
            isLoading={loading}
            isCountUp={true}
            buttonClick={() => navigate(PATHS.DOCTORS)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CustomCard
            title={"Active Doctors"}
            value={dashboardData && dashboardData?.doctors.totalActive}
            icon={
              <LocalHospitalIcon
                color="primary"
                fontSize="large"
                sx={{ fontSize: 60 }}
              />
            }
            isLoading={loading}
            isCountUp={true}
            buttonClick={() => navigate(PATHS.DOCTORS)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CustomCard
            title={"Inactive Doctors"}
            value={dashboardData && dashboardData?.doctors.totalInactive}
            icon={
              <LocalHospitalIcon
                color="primary"
                fontSize="large"
                sx={{ fontSize: 60 }}
              />
            }
            isLoading={loading}
            isCountUp={true}
            buttonClick={() => navigate(PATHS.DOCTORS)}
          />
        </Grid>
        {/* Specialities Info */}
        <Grid item xs={12} sm={6} md={4}>
          <CustomCard
            title={"Total Specialities"}
            value={
              dashboardData && dashboardData?.specialities.totalSpecialities
            }
            icon={
              <LocalOfferIcon
                color="primary"
                fontSize="large"
                sx={{ fontSize: 60 }}
              />
            }
            isLoading={loading}
            isCountUp={true}
            buttonClick={() => navigate(PATHS.SPECIALITIES)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CustomCard
            title={"Total Sub Specialities"}
            value={
              dashboardData && dashboardData?.specialities.totalSubSpecialities
            }
            icon={
              <LocalOfferIcon
                color="primary"
                fontSize="large"
                sx={{ fontSize: 60 }}
              />
            }
            isLoading={loading}
            isCountUp={true}
            buttonClick={() => navigate(PATHS.SPECIALITIES)}
          />
        </Grid>

        {/* Admins Info */}
        <Grid item xs={12} sm={6} md={4}>
          <CustomCard
            title={"Total Admins"}
            value={dashboardData?.totalAdmins}
            icon={
              <PeopleAltIcon
                color="primary"
                fontSize="large"
                sx={{ fontSize: 60 }}
              />
            }
            isLoading={loading}
            isCountUp={true}
            buttonClick={() => navigate(PATHS.ADMINS)}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardScreen;
