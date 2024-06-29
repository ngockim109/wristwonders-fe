import React from "react";
import useAuth from "@hooks/useAuth";
import AdminLayout from "./AdminLayout";
import Layout from "./Layout";

const ProfileLayout: React.FC = () => {
  const { auth } = useAuth();

  if (auth?.member?.isAdmin) {
    return <AdminLayout />;
  }

  return <Layout />;
};

export default ProfileLayout;
