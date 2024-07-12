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