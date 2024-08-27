import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ children }) => {
  const user = useSelector((state) => state.userSlices.user);

  if (!user || user.role === "user") {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;
