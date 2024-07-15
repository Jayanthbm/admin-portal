// src/helpers/util.helper.js

export const isValidToken = (token) => {
  if (!token) {
    return false;
  }
  return true;
};

export const getItemById = (items, id) => {
  return items.find((item) => item.id === id);
};

export const storeJson = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getJson = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const removeItem = (key) => {
  localStorage.removeItem(key);
};

export const storeItem = (key, value) => {
  localStorage.setItem(key, value);
};

export const getItem = (key) => {
  return localStorage.getItem(key);
};
export const isDataFresh = (key, duration = 3600000) => {
  const timestamp = getItem(key + '_timestamp');
  if (!timestamp) return false;
  const currentTime = Date.now();
  return currentTime - timestamp < duration;
};
