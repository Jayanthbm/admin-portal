import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CategoryIcon from '@mui/icons-material/Category';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SettingsIcon from '@mui/icons-material/Settings';
import React from 'react';

import { PATHS } from '../constants';
export const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: PATHS.DASHBOARD },
  { text: 'Doctors', icon: <LocalHospitalIcon />, path: PATHS.DOCTORS },
  { text: 'Specialties', icon: <CategoryIcon />, path: PATHS.SPECIALTIES },
  {
    text: 'User Config',
    icon: <SettingsIcon />,
    path: PATHS.USER_RECORD_CONFIG,
  },
  {
    text: 'Subscriptions',
    icon: <CurrencyRupeeIcon />,
    path: PATHS.SUBSCRIPTIONS,
  },
  {
    text: 'Admins',
    icon: <AdminPanelSettingsIcon />,
    path: PATHS.ADMINS,
  },
];
