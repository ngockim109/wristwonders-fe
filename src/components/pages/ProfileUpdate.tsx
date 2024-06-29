import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "@hooks/useAuth"; // Hook to access authentication context
import api from "@services/api"; // Custom API service
import { IMember } from "@interfaces/member.interface"; // Member interface
import { ToastContainer, toast } from "react-toastify";

const ProfileUpdate = () => {
  const { auth } = useAuth(); // Accessing auth context
  const [profile, setProfile] = useState<IMember | null>(null); // Profile state
  const [formData, setFormData] = useState({
    name: "",
    YOB: "",
  }); // Form data state
  const [message, setMessage] = useState(""); // Message state for success messages
  const [error, setError] = useState(""); // Error state for error messages
  const [loading, setLoading] = useState(true); // Loading state to handle loading state

  // Fetch profile data when the component mounts or when auth changes
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = auth?.access_token; // Get the access token from auth context
        if (token) {
          const response = await api.get("/members/profile", {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in request headers
            },
          });
          setProfile(response.data.data); // Set the profile data
          setFormData({
            name: response.data.data.name || "", // Initialize form data with profile info
            YOB: response.data.data.YOB || "",
          });
        } else {
          setError("No valid token found."); // Handle missing token error
        }
      } catch (err) {
        setError("Failed to fetch profile. Please try again later."); // Handle fetch error
      } finally {
        setLoading(false); // Set loading to false after fetch completes
      }
    };

    fetchProfile();
  }, [auth]);

  // Handle input change to update formData state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission to update profile
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = auth?.access_token; // Get the access token from auth context
      if (token) {
        const response = await api.post(
          "/members/profile/update-profile", // Correct endpoint for updating profile
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
        toast.success("Change profile information successfully!");
      } else {
        setError("No valid token found."); // Handle missing token error
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update profile."); // Handle update error
      setMessage(""); // Clear message on error
      toast.error(err.response?.data?.error || "Failed to update profile.");
    }
  };

  // Show loading state if loading
  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div className="container mt-3">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
        />
        <div className="rounded-1 bg-new-secondary py-2 px-3 mt-3 d-flex align-items-center">
          <Link className="text-decoration-none" to="/profile">
            Profile
          </Link>
          <i className="bi bi-chevron-right mx-1"></i>
          <span>Update profile</span>
        </div>
        <h4 className="mt-3">Update Profile</h4>
        <div className="d-flex flex-column align-items-center justify-content-center">
          {/* Profile update form */}
          <form onSubmit={handleSubmit} className="w-50">
            <label htmlFor="name">Name:</label>
            <input
              className="form-control"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              minLength={1}
            />
            {error?.name && <p className="text-danger">{error.name}</p>}

            <label htmlFor="YOB">Year of Birth:</label>
            <input
              className="form-control"
              type="number"
              id="YOB"
              name="YOB"
              value={formData.YOB}
              onChange={handleChange}
              required
            />
            {error?.YOB && <p className="text-danger">{error.YOB}</p>}

            <div className="d-flex justify-content-center align-items-center mt-3">
              <button className="btn btn-dark" type="submit">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfileUpdate;
