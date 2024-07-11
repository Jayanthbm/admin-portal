// src/pages/SpecialitiesScreen.js

import AcUnitIcon from "@mui/icons-material/AcUnit";
import CategoryIcon from "@mui/icons-material/Category";
import { Box, Grid } from "@mui/material";
import React, { useContext } from "react";
import AddButton from "../components/AddButton";
import CustomBreadCrumb from "../components/CustomBreadCrumb";
import CustomCard from "../components/CustomCard";
import PageTitle from "../components/PageTitle";
import { PATHS } from "../constants";
import AuthContext from "../context/auth.context";
import useAuthNavigation from "../hooks/useAuthNavigation";
const SpecialitiesScreen = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const naviagte = useAuthNavigation(isLoggedIn, PATHS.SPECIALITIES);

  const specalities = [
    {
      title: "Speciality 1",
      totalSubSpecialities: 5,
    },
    {
      title: "Speciality 2",
      totalSubSpecialities: 2,
    },
    {
      title: "Speciality 3",
      totalSubSpecialities: 1,
    },
    {
      title: "Speciality 4",
      totalSubSpecialities: 10,
    },
    {
      title: "Speciality 5",
      totalSubSpecialities: 5,
    },
  ];
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <PageTitle title="Specialities" />
      <CustomBreadCrumb
        paths={[
          {
            title: "Specalities",
            icon: <CategoryIcon sx={{ mr: 0.5 }} fontSize="inherit" />,
          },
        ]}
      />
      <AddButton onClick={() => {}} title="Add Speciality" />
      <Grid container spacing={3}>
        {specalities.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <CustomCard
              title={item.title}
              icon={
                <AcUnitIcon
                  color="primary"
                  fontSize="large"
                  sx={{ fontSize: 60 }}
                />
              }
              buttonClick={() =>
                naviagte(PATHS.SPECIALITIES + "/" + index, { state: item })
              }
              detailsText="More"
              value={item.totalSubSpecialities}
              valueToolTip="Total Sub Specialities"
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SpecialitiesScreen;
