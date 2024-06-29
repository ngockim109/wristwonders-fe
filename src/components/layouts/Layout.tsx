import Footer from "@components/organisms/Footer";
import Navbar from "@components/organisms/Navbar";
import useAuth from "@hooks/useAuth";
import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const { auth, logout } = useAuth();
  const handleLogout = () => {
    logout();
  };
  return (
    <div id="layout">
      <Navbar member={auth?.member} handleLogout={handleLogout} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
