

import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function AdminRoute() {
  const user = useSelector((state) => state.userSlices.user);

  console.log("AdminRoute reached", user);

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default AdminRoute;
