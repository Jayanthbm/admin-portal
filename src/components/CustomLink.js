import { Link } from "@mui/material";
import React from "react";

const CustomLink = ({ title, onClick }) => {
  return (
    <Link sx={{ cursor: "pointer" }} onClick={onClick}>
      {title}
    </Link>
  );
};

export default CustomLink;
