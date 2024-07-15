// src/pages/DashboardScreen.js

import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Box, Grid } from "@mui/material";
import React, { useCallback, useContext, useEffect, useState } from "react";

import PageTitle from "../components/Layout/PageTitle";
import { API_ENDPOINTS, PATHS } from "../constants";
import AuthContext from "../context/auth.context";
import { getItems } from "../helpers/api.handler";

import CustomCard from "../components/Card/CustomCard";
import useAuthNavigation from "../hooks/useAuthNavigation";
const DashboardScreen = () => {
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useAuthNavigation(isLoggedIn, PATHS.DASHBOARD);
  const [data, setData] = useState(null);

  const fetchItems = useCallback(async (force) => {
    await getItems({
      url: API_ENDPOINTS.DASHBOARD,
      loadingFunction: setLoading,
      snackBarFunction: null,
      dataSetterState: setData,
      commonFunction: () => {},
      force: force,
    });
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);
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
            value={data && data?.doctors.totalDoctors}
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
            value={data && data?.doctors.totalActive}
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
            value={data && data?.doctors.totalInactive}
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
            value={data && data?.specialities.totalSpecialities}
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
            value={data && data?.specialities.totalSubSpecialities}
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
            value={data?.totalAdmins}
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
