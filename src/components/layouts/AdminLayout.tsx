import FooterAdmin from "@components/organisms/FooterAdmin";
import NavbarAdmin from "@components/organisms/NavbarAdmin";
import Sidebar from "@components/organisms/Sidebar";
import useAuth from "@hooks/useAuth";
import React from "react";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const { auth, logout } = useAuth();
  const handleLogout = () => {
    logout();
  };
  return (
    <div className="d-flex w-100">
      <Sidebar />
      <div className="main-content" id="admin-layout">
        <NavbarAdmin member={auth?.member} handleLogout={handleLogout} />
        <Outlet />
        <FooterAdmin />
      </div>
    </div>
  );
};

export default AdminLayout;
