// src/pages/UserRecordConfigScreen.js

import SettingsIcon from "@mui/icons-material/Settings";
import { Box } from "@mui/material";
import React, { useCallback, useContext, useEffect, useState } from "react";
import CustomBreadCrumb from "../components/Layout/CustomBreadCrumb";
import MyPageLayout from "../components/Layout/MyPageLayout";
import PageTitle from "../components/Layout/PageTitle";
import { API_ENDPOINTS, PATHS } from "../constants";
import AuthContext from "../context/auth.context";
import { getItems } from "../helpers/api.handler";
import useAuthNavigation from "../hooks/useAuthNavigation";
const UserRecordConfigScreen = () => {
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);
  useAuthNavigation(isLoggedIn, PATHS.USER_RECORD_CONFIG);
  const [data, setData] = useState([]);

  const fetchItems = useCallback(async (force) => {
    await getItems({
      url: API_ENDPOINTS.USER_RECORD_CONFIG,
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
      <PageTitle title="Record Configuration" />
      <CustomBreadCrumb
        paths={[
          {
            title: "Record Config",
            icon: <SettingsIcon sx={{ mr: 0.5 }} fontSize="inherit" />,
          },
        ]}
      />
      <MyPageLayout
        isLoading={loading}
        noPageButtonTitle="Add Configuration"
        noPageButton={null}
        noPageTitle="No Record Configurations"
        data={data}
        showSkeleton={true}
      ></MyPageLayout>
    </Box>
  );
};

export default UserRecordConfigScreen;
