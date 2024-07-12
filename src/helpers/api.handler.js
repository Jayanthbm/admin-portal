//src/helpers/api.handler.js

import { del, get, patch, post } from "./api.helper";

const showSnackbar = (message, severity = "success", snackbar) => {
  if (snackbar) {
    snackbar(message, severity);
  }
};
export const getItems = async ({
  url,
  loadingFunction,
  snackBarFunction,
  dataSetterState,
  commonFunction,
}) => {
  loadingFunction(true);
  try {
    const result = await get(url);
    if (result.status === 200) {
      const data = result?.data;
      dataSetterState(data);
      showSnackbar(result?.message, "success", snackBarFunction);
    } else {
      showSnackbar(result?.message, "error", snackBarFunction);
    }
  } catch (error) {
    console.log("Error fetching items:", error);
    showSnackbar(error?.message, "error", snackBarFunction);
  } finally {
    loadingFunction(false);
    commonFunction();
  }
};

export const addItem = async ({
  url,
  data,
  loadingFunction,
  snackBarFunction,
  reloadData,
  commonFunction,
}) => {
  loadingFunction(true);
  try {
    const result = await post(url, data);
    if (result.status === 201) {
      showSnackbar(result?.message, "success", snackBarFunction);
      await reloadData();
    } else {
      showSnackbar(result?.message, "error", snackBarFunction);
    }
  } catch (error) {
    console.log("Error adding item:", error);
    showSnackbar(error?.message, "error", snackBarFunction);
  } finally {
    loadingFunction(false);
    commonFunction();
  }
};

export const updateItem = async ({
  url,
  data,
  loadingFunction,
  snackBarFunction,
  reloadData,
  commonFunction,
}) => {
  loadingFunction(true);
  try {
    const result = await patch(url, data);
    if (result.status === 200 || result.status === 204) {
      showSnackbar(result?.message, "success", snackBarFunction);
      await reloadData();
    } else {
      showSnackbar(result?.message, "error", snackBarFunction);
    }
  } catch (error) {
    console.log("Error updating item:", error);
    showSnackbar(error?.message, "error", snackBarFunction);
  } finally {
    loadingFunction(false);
    commonFunction();
  }
};

export const deleteItem = async ({
  url,
  data,
  loadingFunction,
  snackBarFunction,
  reloadData,
  commonFunction,
}) => {
  loadingFunction(true);
  try {
    const result = await del(url, data);
    if (
      result.status === 200 ||
      result.status === 202 ||
      result.status === 204
    ) {
      showSnackbar(result?.message, "success", snackBarFunction);
      await reloadData();
    } else {
      showSnackbar(result?.message, "error", snackBarFunction);
    }
  } catch (error) {
    console.log("Error deleting item:", error);
    showSnackbar(error?.message, "error", snackBarFunction);
  } finally {
    loadingFunction(false);
    commonFunction();
  }
};
