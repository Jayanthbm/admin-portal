// src/pages/DoctorScreen.js
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { Box } from '@mui/material';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import CustomBreadCrumb from '../components/Layout/CustomBreadCrumb';
import MyPageLayout from '../components/Layout/MyPageLayout';
import PageTitle from '../components/Layout/PageTitle';
import { API_ENDPOINTS, PATHS } from '../constants';
import AuthContext from '../context/auth.context';
import { getItems } from '../helpers/api.handler';
import useAuthNavigation from '../hooks/useAuthNavigation';

const DoctorScreen = () => {
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useContext(AuthContext);
  const { id } = useParams();

  const location = useLocation();
  const state = location.state;
  useAuthNavigation(isLoggedIn, PATHS.DOCTORS + '/' + id, state);

  const [data, setData] = useState([]);

  const fetchItems = useCallback(
    async (force) => {
      await getItems({
        url: `${API_ENDPOINTS.DOCTOR}/${id}`,
        loadingFunction: setLoading,
        snackBarFunction: null,
        dataSetterState: setData,
        commonFunction: () => {},
        force: force,
      });
    },
    [id]
  );

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return (
    <>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <PageTitle
          title="Doctor Details"
          onRefresh={() => {
            fetchItems(true);
          }}
        />
        <CustomBreadCrumb
          paths={[
            {
              navigation: PATHS.DOCTORS,
              title: 'Doctors',
              icon: <LocalHospitalIcon sx={{ mr: 0.5 }} fontSize="inherit" />,
            },
            {
              title: state?.name || 'Doctor Details',
              icon: <></>,
            },
          ]}
        />
        <MyPageLayout
          isLoading={loading}
          showSkeleton={true}
          showNoDataCard={false}
          showViewSetting={false}
        ></MyPageLayout>
        <MyPageLayout
          isLoading={loading}
          showSkeleton={true}
          data={data?.subscriptions}
          showViewSetting={false}
          noPageTitle={'No Subcriptions Assigned'}
          noPageButtonTitle={'Add Subscription'}
          noPageButton={() => {}}
        ></MyPageLayout>
      </Box>
    </>
  );
};

export default DoctorScreen;
