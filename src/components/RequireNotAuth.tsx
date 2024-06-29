import useAuth from "@hooks/useAuth";
import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { Spin } from "antd";

const RequireNotAuth = () => {
  const { auth, loading } = useAuth();
  const location = useLocation();
  console.log(auth);
  if (loading) return <Spin size="large" />;
  if (auth && auth?.member) {
    return <Navigate to={location.state?.from || "/"} replace />;
  }
  return <Outlet />;
};

export default RequireNotAuth;
