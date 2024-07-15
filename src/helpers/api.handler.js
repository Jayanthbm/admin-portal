//src/helpers/api.handler.js

import { del, get, patch, post } from './api.helper';
import { getJson, isDataFresh, storeItem, storeJson } from './util.helper';

const showSnackbar = (message, severity = 'success', snackbar) => {
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
  force = false,
}) => {
  loadingFunction(true);
  try {
    // check if data is already cached and last fetched data is not older than 1 hour
    if (!force) {
      const cachedData = getJson(url);
      if (cachedData && isDataFresh(url)) {
        dataSetterState(cachedData);
        return;
      } else {
        await getItems({
          url,
          loadingFunction,
          snackBarFunction,
          dataSetterState,
          commonFunction,
          force: true,
        });
      }
    }
    const result = await get(url);
    if (result.status === 200) {
      const data = result?.data;
      dataSetterState(data);
      storeJson(url, data);
      storeItem(url + '_timestamp', Date.now());
      showSnackbar(result?.message, 'success', snackBarFunction);
    } else {
      showSnackbar(result?.message, 'error', snackBarFunction);
    }
  } catch (error) {
    console.log('Error fetching items:', error);
    showSnackbar(error?.message, 'error', snackBarFunction);
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
      showSnackbar(result?.message, 'success', snackBarFunction);
      await reloadData();
    } else {
      showSnackbar(result?.message, 'error', snackBarFunction);
    }
  } catch (error) {
    console.log('Error adding item:', error);
    showSnackbar(error?.message, 'error', snackBarFunction);
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
    if (result.status === 202) {
      showSnackbar(result?.message, 'success', snackBarFunction);
      await reloadData();
    } else {
      showSnackbar(result?.message, 'error', snackBarFunction);
    }
  } catch (error) {
    console.log('Error updating item:', error);
    showSnackbar(error?.message, 'error', snackBarFunction);
  } finally {
    loadingFunction(false);
    commonFunction();
  }
};

export const deleteItem = async ({
  url,
  loadingFunction,
  snackBarFunction,
  reloadData,
  commonFunction,
}) => {
  loadingFunction(true);
  try {
    const result = await del(url);
    if (result.status === 202) {
      showSnackbar(result?.message, 'success', snackBarFunction);
      await reloadData();
    } else {
      showSnackbar(result?.message, 'error', snackBarFunction);
    }
  } catch (error) {
    console.log('Error deleting item:', error);
    showSnackbar(error?.message, 'error', snackBarFunction);
  } finally {
    loadingFunction(false);
    commonFunction();
  }
};
