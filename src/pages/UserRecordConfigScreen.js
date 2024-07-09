import React, { useContext } from "react";
import { PATHS } from "../constants";
import AuthContext from "../context/auth.context";
import useAuthNavigation from "../hooks/useAuthNavigation";

const UserRecordConfigScreen = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const naviagte = useAuthNavigation(isLoggedIn, PATHS.USER_RECORD_CONFIG);
  return <div>UserRecordConfigScreen</div>;
};

export default UserRecordConfigScreen;
