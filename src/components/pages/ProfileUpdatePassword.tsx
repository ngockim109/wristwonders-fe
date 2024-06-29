import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "@hooks/useAuth"; // Hook to access authentication context
import api from "@services/api"; // Custom API service
import { ToastContainer, toast } from "react-toastify";

const ProfileUpdatePassword = () => {
  const { auth } = useAuth(); // Accessing auth context
  const [formData, setFormData] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  }); // Form data state
  const [message, setMessage] = useState(""); // Message state for success messages
  const [error, setError] = useState(""); // Error state for error messages
  const { logout } = useAuth();

  // Handle input change to update formData state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission to update password
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = auth?.access_token; // Get the access token from auth context
      if (token) {
        const response = await api.post(
          "/members/profile/update-password",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in request headers
            },
            withCredentials: true, // Ensure credentials are included
          },
        );
        setMessage(response.data.message); // Set success message
        setError(""); // Clear error on successful update
        // Clear form fields after successful submission
        setFormData({
          oldPassword: "",
          password: "",
          confirmPassword: "",
        });
        toast.success(response.data.message ?? "Update password successfully!");
        logout();
      } else {
        setError("No valid token found."); // Handle missing token error
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update password."); // Handle update error
      setMessage(""); // Clear message on error
      toast.error(err.response?.data?.error || "Failed to update password.");
    }
  };

  return (
    <div className="container mt-3">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
      />
      <div className="rounded-1 bg-new-secondary py-2 px-3 mt-3 d-flex align-items-center mb-3">
        <Link className="text-decoration-none" to="/profile">
          Profile
        </Link>
        <i className="bi bi-chevron-right mx-1"></i>
        <span>Update password</span>
      </div>
      <h4 className="">Change Password</h4>

      <div className="d-flex flex-column align-items-center justify-content-center">
        {/* Password update form */}
        <form onSubmit={handleSubmit} className="w-50">
          <label htmlFor="oldPassword" className="form-label">
            Old Password:
          </label>
          <input
            className="form-control"
            type="password"
            id="oldPassword"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
            required
            minLength={8}
          />
          {error?.oldPassword && (
            <p className="text-danger">{error.oldPassword}</p>
          )}

          <label htmlFor="password" className="form-label mt-2">
            New Password:
          </label>
          <input
            className="form-control"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={8}
          />
          {error?.password && <p className="text-danger">{error.password}</p>}

          <label htmlFor="confirmPassword" className="form-label mt-2">
            Confirm New Password:
          </label>
          <input
            className="form-control"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            minLength={8}
          />
          {error?.confirmPassword && (
            <p className="text-danger">{error.confirmPassword}</p>
          )}

          <div className="d-flex justify-content-center align-items-center mt-3">
            <button className="btn btn-dark" type="submit">
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdatePassword;
