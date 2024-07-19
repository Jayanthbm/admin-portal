// src/constants.js

export const BASE_URL = 'https://d979-103-186-41-217.ngrok-free.app/api';

export const TOKEN_KEY = 'accessToken';
export const REFRESH_KEY = 'refreshToken';

export const API_ENDPOINTS = {
  LOGIN: '/auth/admin-login',
  REFRESHTOKEN: '/auth/admin-token',
  DASHBOARD: '/admin/dashboard',
  ALLADMINS: '/admin/all-admins',
  ADDADMIN: '/admin/add',
  UPDATEADMIN: '/admin/update',
  DELETEADMIN: '/admin/delete',
  ALLSPECIALTIES: '/common/specialties',
  SPECIALTY: '/admin/specialty',
  DOCTORS: '/admin/doctors',
  DOCTOR: '/admin/doctor',
  USER_RECORD_CONFIG: '/admin/formfields',
  SUBSCRIPTIONS: '/admin/subscriptions',
  SUBSCRIPTION: '/admin/subscription',
};

const PATHS_BASE_PATH = '/admin-portal/';

export const PATHS = {
  ROOT: PATHS_BASE_PATH,
  LOGIN: `${PATHS_BASE_PATH}login`,
  DASHBOARD: `${PATHS_BASE_PATH}dashboard`,
  DOCTORS: `${PATHS_BASE_PATH}doctors`,
  SPECIALTIES: `${PATHS_BASE_PATH}specialties`,
  USER_RECORD_CONFIG: `${PATHS_BASE_PATH}user-record-config`,
  ADMINS: `${PATHS_BASE_PATH}admins`,
  LOGOUT: `${PATHS_BASE_PATH}logout`,
  SUBSCRIPTIONS: `${PATHS_BASE_PATH}subscriptions`,
};
