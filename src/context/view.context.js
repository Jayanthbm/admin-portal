import React, { createContext, useContext, useState } from "react";

const ViewContext = createContext();

export const useView = () => {
  return useContext(ViewContext);
};

export const ViewProvider = ({ children }) => {
  const [view, setView] = useState("card");
  return (
    <ViewContext.Provider value={{ view, setView }}>
      {children}
    </ViewContext.Provider>
  );
};

export default ViewContext;
