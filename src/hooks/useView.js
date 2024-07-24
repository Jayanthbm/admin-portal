// src/hooks/useView.js

import { useContext } from 'react';

import ViewContext from '../context/view.context';

const useView = () => {
  return useContext(ViewContext);
};

export default useView;
