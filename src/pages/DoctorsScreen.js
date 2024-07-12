// src/pages/DoctorsScreen.js

import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { Box } from "@mui/material";
import React, { useCallback, useContext, useEffect, useState } from "react";
import AddButton from "../components/AddButton";
import CustomBreadCrumb from "../components/CustomBreadCrumb";
import MyPageLayout from "../components/MyPageLayout";
import PageTitle from "../components/PageTitle";
import { API_ENDPOINTS, PATHS } from "../constants";
import AuthContext from "../context/auth.context";
import { getItems } from "../helpers/api.handler";
import useAuthNavigation from "../hooks/useAuthNavigation";
const DoctorsScreen = () => {
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);
  useAuthNavigation(isLoggedIn, PATHS.DOCTORS);
  const [data, setData] = useState([]);

  const fetchItems = useCallback(async (force) => {
    await getItems({
      url: API_ENDPOINTS.DOCTORS,
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
      <PageTitle title="Doctors" />
      <CustomBreadCrumb
        paths={[
          {
            title: "Doctors",
            icon: <LocalHospitalIcon sx={{ mr: 0.5 }} fontSize="inherit" />,
          },
        ]}
      />
      <MyPageLayout
        isLoading={loading}
        noPageButtonTitle="Add Doctor"
        noPageButton={null}
        noPageTitle="No Doctors"
        data={data}
        showSkeleton={true}
      >
        <AddButton onClick={() => {}} title="Add Admin" disabled={loading} />
      </MyPageLayout>
    </Box>
  );
};

export default DoctorsScreen;
