// src/constants.js

export const BASE_URL = "http://localhost:4000/api";

export const TOKEN_KEY = "accessToken";
export const REFRESH_KEY = "refreshToken";

export const API_ENDPOINTS = {
  LOGIN: "/auth/admin-login",
  REFRESHTOKEN: "/auth/admin-token",
  DASHBOARD: "/admin/dashboard",
  ALLADMINS: "/admin/all-admins",
  ADDADMIN: "/admin/add",
  UPDATEADMIN: "/admin/update",
  DELETEADMIN: "/admin/delete",
  ALLSPECIALITIES: "/common/specialties",
  SPECIALITY: "/admin/specialty",
};

const PATHS_BASE_PATH = "/";

export const PATHS = {
  ROOT: PATHS_BASE_PATH,
  LOGIN: `${PATHS_BASE_PATH}login`,
  DASHBOARD: `${PATHS_BASE_PATH}dashboard`,
  DOCTORS: `${PATHS_BASE_PATH}doctors`,
  SPECIALITIES: `${PATHS_BASE_PATH}specialities`,
  USER_RECORD_CONFIG: `${PATHS_BASE_PATH}user-record-config`,
  ADMINS: `${PATHS_BASE_PATH}admins`,
};
