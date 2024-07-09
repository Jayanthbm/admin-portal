import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, MemoryRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/auth.context";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </AuthProvider>
  </React.StrictMode>
);
