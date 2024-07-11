// src/helpers/auth.helper.js

export const setToken = (key, token) => {
  if (token) {
    localStorage.setItem(key, token);
  }
};

export const getToken = (key) => {
  return localStorage.getItem(key);
};

export const removeToken = (key) => {
  localStorage.removeItem(key);
};
