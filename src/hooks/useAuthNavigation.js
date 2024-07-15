// src/hooks/useAuthNavigation.js

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { PATHS } from '../constants';

function useAuthNavigation(isLoggedIn, currentPath, existingState) {
  const navigate = useNavigate();

  currentPath = currentPath || PATHS.DASHBOARD;
  useEffect(
    () => {
      if (isLoggedIn) {
        navigate(currentPath, { state: existingState });
      } else {
        navigate(PATHS.LOGIN);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isLoggedIn, navigate, currentPath]
  );

  return navigate;
}

export default useAuthNavigation;
