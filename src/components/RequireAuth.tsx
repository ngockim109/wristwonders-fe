import useAuth from "@hooks/useAuth";
import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { Spin } from "antd";

interface RequireAuthProps {
  allowedRoles: boolean[];
}

const RequireAuth: React.FC<RequireAuthProps> = ({ allowedRoles }) => {
  const { auth, loading } = useAuth();
  const location = useLocation();
  console.log(auth);
  if (loading) return <Spin size="large" />;
  if (!auth || !auth?.member) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  } else {
    console.log(!allowedRoles?.includes(auth?.member?.isAdmin));
    if (!allowedRoles?.includes(auth?.member?.isAdmin)) {
      console.log(true);
      return <Navigate to="/forbidden" state={{ from: location }} replace />;
    } else {
      return <Outlet />;
    }
  }
};

export default RequireAuth;
