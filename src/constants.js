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
};

export const PATHS = {
  ROOT: "/",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  DOCTORS: "/doctors",
  SPECIALITIES: "/specialities",
  USER_RECORD_CONFIG: "/user-record-config",
  ADMINS: "/admins",
};
