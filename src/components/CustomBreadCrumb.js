// src/components/CustomBreadCrumb.js

import HomeIcon from "@mui/icons-material/Home";
import { Breadcrumbs, Link } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../constants";

const CustomBreadCrumb = ({ paths }) => {
  const naviagte = useNavigate();
  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          color="inherit"
          onClick={() => naviagte(PATHS.DASHBOARD)}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Home
        </Link>
        {paths?.map((path, index) => (
          <Link
            key={index}
            underline={path?.navigation ? "hover" : "none"}
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: path?.navigation ? "pointer" : "default",
            }}
            color="inherit"
            onClick={() => naviagte(path?.navigation)}
          >
            {path.icon} {path?.title}
          </Link>
        ))}
      </Breadcrumbs>
    </div>
  );
};

export default CustomBreadCrumb;
