// src/hooks/useAuthNavigation.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useAuthNavigation(isLoggedIn, currentPath) {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate(currentPath);
    } else {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return navigate;
}

export default useAuthNavigation;
