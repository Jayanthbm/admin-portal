import CategoryIcon from "@mui/icons-material/Category";
import { Box } from "@mui/material";
import React, { useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import AddButton from "../components/AddButton";
import CustomBreadCrumb from "../components/CustomBreadCrumb";
import PageTitle from "../components/PageTitle";
import { PATHS } from "../constants";
import AuthContext from "../context/auth.context";
import useAuthNavigation from "../hooks/useAuthNavigation";

const SubSpecialityScreen = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const { id } = useParams();
  const location = useLocation();
  const state = location.state;
  const navigate = useAuthNavigation(
    isLoggedIn,
    PATHS.SPECIALITIES + "/" + id,
    state
  );

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <PageTitle title="Sub Specialities" />
      <CustomBreadCrumb
        paths={[
          {
            navigation: PATHS.SPECIALITIES,
            title: "Specialities",
            icon: <CategoryIcon sx={{ mr: 0.5 }} fontSize="inherit" />,
          },
          {
            title: state?.title || "Sub Specialities",
            icon: <></>,
          },
        ]}
      />
      <AddButton onClick={() => {}} title="Add Sub Speciality" />
    </Box>
  );
};

export default SubSpecialityScreen;
