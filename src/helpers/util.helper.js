// src/helpers/util.helper.js

export const isValidToken = (token) => {
  if (!token) {
    console.error('Token not provided');
    return false;
  }

  // Check if token is in valid JWT format (header.payload.signature)
  const parts = token.split('.');
  if (parts.length !== 3) {
    console.error('Token is not in valid JWT format');
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

export const getRemainingDays = (startDate, endDate) => {
  const date1 = new Date(startDate);
  const date2 = new Date(endDate);
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const formatDate = (d) => {
  const date = new Date(d);
  if (isNaN(date)) {
    return 'Invalid Date';
  }
  const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

  return formattedDate;
};
