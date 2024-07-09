//api.helper.js
import axios from "axios";
import { API_ENDPOINTS, BASE_URL, REFRESH_KEY, TOKEN_KEY } from "../constants";
import { getToken, setToken } from "./auth.helper";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercept request to add token to headers
api.interceptors.request.use(
  (config) => {
    const token = getToken(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercept response to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await axios.post(
          `${BASE_URL}${API_ENDPOINTS.refreshToken}`,
          {
            refreshToken: getToken(REFRESH_KEY),
          },
          { withCredentials: true } // Adjust if needed for your backend
        );
        let accessToken = data.data.accessToken;
        setToken(TOKEN_KEY, accessToken);
        let refreshToken = data.data.refreshToken;
        setToken(REFRESH_KEY, refreshToken);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

// Helper functions
export const get = async (url, params = {}) => {
  try {
    const response = await api.get(url, { params });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const post = async (url, data) => {
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const put = async (url, data) => {
  try {
    const response = await api.put(url, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const del = async (url) => {
  try {
    const response = await api.delete(url);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
