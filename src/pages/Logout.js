import React from "react";
import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../context/UserContext";


const Logout = () => {
  const { unsetUser, setUser } = useContext(UserContext);
  unsetUser();
  useEffect(() => {
    setUser({
      id: null,
      isAdmin: null,
    });
  }, [setUser]);

  return <Navigate to="/login" />;
};

export default Logout;
