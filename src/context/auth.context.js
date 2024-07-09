// AuthContext.js
import React, { createContext, useEffect, useState } from "react";
import { isValidToken } from "../helpers/util.helper";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function init() {
      const token = localStorage.getItem("accessToken");
      if (token && isValidToken(token)) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }

    init();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
