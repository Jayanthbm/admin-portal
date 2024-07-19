// src/pages/DashboardScreen.js

import { Box } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import DashboardCard from '../components/Card/DashboardCard';
import PageTitle from '../components/Layout/PageTitle';
import { API_ENDPOINTS, PATHS } from '../constants';
import { getItems } from '../helpers/api.handler';
const DashboardScreen = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          flexWrap: 'wrap',
        }}
      >
        <DashboardCard
          title={'Total Doctors'}
          value={data && data?.doctors.totalDoctors}
          onNavigate={() => navigate(PATHS.DOCTORS)}
          isLoading={loading}
        />
        <DashboardCard
          title={'Active Doctors'}
          value={data && data?.doctors.totalActive}
          onNavigate={() => navigate(PATHS.DOCTORS)}
          isLoading={loading}
        />
        <DashboardCard
          title={'Inactive Doctors'}
          value={data && data?.doctors.totalInactive}
          onNavigate={() => navigate(PATHS.DOCTORS)}
          isLoading={loading}
        />
        <DashboardCard
          title={'Specialties'}
          value={data && data?.specialties.totalspecialties}
          onNavigate={() => navigate(PATHS.SPECIALTIES)}
          isLoading={loading}
        />
        <DashboardCard
          title={'Sub Specialties'}
          value={data && data?.specialties.totalSubspecialties}
          onNavigate={() => navigate(PATHS.SPECIALTIES)}
          isLoading={loading}
        />
        <DashboardCard
          title={'Admins'}
          value={data?.totalAdmins}
          onNavigate={() => navigate(PATHS.ADMINS)}
          isLoading={loading}
        />
      </Box>
    </Box>
  );
};

export default DashboardScreen;
