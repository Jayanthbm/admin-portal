// src/hooks/useSnackBar.js

import { useContext } from 'react';

import SnackbarContext from '../context/snackbar.context';

const useSnackBar = () => {
  return useContext(SnackbarContext);
};

export default useSnackBar;
