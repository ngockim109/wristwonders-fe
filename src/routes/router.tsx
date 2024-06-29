import React from "react";
import AdminLayout from "@components/layouts/AdminLayout";
import Layout from "@components/layouts/Layout";
import {
  Route,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "@components/pages/Home";
import Dashboard from "@components/pages/Dashboard";
import Brands from "@components/pages/Brands";
import Forbidden from "@components/pages/errors/403";
import ServerError from "@components/pages/errors/500";
import NotFound from "@components/pages/errors/404";
import Login from "@components/pages/Login";
import RequireAuth from "@components/RequireAuth";
import RequireNotAuth from "@components/RequireNotAuth";
import Register from "@components/pages/Register";
import Watches from "@components/pages/Watches";
import Profile from "@components/pages/Profile";
import ProfileLayout from "@components/layouts/ProfileLayout";
import ProfileUpdate from "@components/pages/ProfileUpdate";
import ProfileUpdatePassword from "@components/pages/ProfileUpdatePassword";
import ProfileFeedbacks from "@components/pages/ProfileFeedbacks";
import WatchDetails from "@components/pages/WatchDetail";
import Account from "@components/pages/Account";
import AccountDetail from "@components/pages/AccountDetail";
import BrandDetail from "@components/pages/BrandDetail";
import WatchManagementDetails from "@components/pages/WatchManagementDetail";
import SearchResult from "@components/pages/SearchResult";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="auth/login" element={<Login />} />
      </Route>
      <Route element={<RequireAuth allowedRoles={[true]} />}>
        <Route path="/" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="brands" element={<Brands />} />
        </Route>
      </Route>

      {/* Error handling routes */}
      <Route path="/forbidden" element={<Forbidden />} />
      <Route path="/error" element={<ServerError />} />
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
);

export const AppRouter = () => (
  <Routes>
    <Route path="/">
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/search" element={<SearchResult />} />
        <Route path="/watches/collection/:id" element={<WatchDetails />} />
        <Route path="" element={<RequireNotAuth />}>
          <Route path="auth/login" element={<Login />} />
          <Route path="auth/register" element={<Register />} />
        </Route>
      </Route>
      <Route element={<RequireAuth allowedRoles={[true]} />}>
        <Route element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="brands" element={<Brands />} />
          <Route path="watches" element={<Watches />} />
          <Route path="accounts" element={<Account />} />
          <Route path="accounts/:id" element={<AccountDetail />} />
          <Route path="brands/:id" element={<BrandDetail />} />
          <Route path="watches/:id" element={<WatchManagementDetails />} />
        </Route>
      </Route>
      <Route element={<RequireAuth allowedRoles={[true, false]} />}>
        <Route path="profile" element={<ProfileLayout />}>
          <Route index element={<Profile />} />
          <Route path="update-password" element={<ProfileUpdatePassword />} />
          <Route path="update-profile" element={<ProfileUpdate />} />
          <Route path="feedbacks" element={<ProfileFeedbacks />} />
        </Route>
      </Route>

      {/* Error handling routes */}
      <Route path="/forbidden" element={<Forbidden />} />
      <Route path="/error" element={<ServerError />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);
