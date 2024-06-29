import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "@hooks/useAuth";
import api from "@services/api";
import { IMember } from "@interfaces/member.interface";
import { Spin } from "antd";

const Profile = () => {
  const { auth } = useAuth();
  const [profile, setProfile] = useState<IMember>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = auth?.access_token;
        if (token) {
          const response = await api.get("/members/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response);
          setProfile(response.data.data);
        } else {
          setError("No valid token found.");
        }
      } catch (err) {
        setError("Failed to fetch profile. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [auth]);

  if (loading)
    return (
      <div>
        <Spin size="large" />
      </div>
    );

  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <div className="rounded-1 bg-new-secondary py-2 px-3 mt-3 d-flex align-items-center mb-3">
        <Link className="text-decoration-none" to="/">
          Home
        </Link>
        <i className="bi bi-chevron-right mx-1"></i>
        <span>Profile</span>
      </div>
      {/* Display profile information if available */}
      {profile ? (
        <div>
          <div className="card w-75 mx-auto profile-mem-container">
            <div className="card-header d-flex gap-2 align-items-center">
              <h4>Profile Information</h4>
              <button
                type="button"
                className="btn bg-custom text-dark me-2 fw-bold"
              >
                <Link
                  to="/profile/update-profile"
                  className="text-decoration-none text-dark"
                >
                  <i className="bi bi-pencil-square d-flex justify-content-center align-items-center"></i>
                </Link>
              </button>
              <button
                type="button"
                className="btn bg-custom text-dark me-2 fw-bold"
              >
                <Link
                  to="/profile/update-password"
                  className="text-decoration-none text-dark"
                >
                  Change Password
                </Link>
              </button>
              {!profile?.isAdmin && (
                <button
                  type="button"
                  className="btn bg-custom text-dark me-2 fw-bold"
                >
                  <Link
                    to="/profile/feedbacks"
                    className="text-decoration-none text-dark"
                  >
                    View my feedbacks
                  </Link>
                </button>
              )}
            </div>
            <div className="card-body">
              <p>Membername: {profile.membername}</p>
              <p>Name: {profile.name}</p>
              <p>Year of Birth: {profile.YOB}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex flex-column align-items-center justify-content-center">
          <div className="img-container my-auto">
            <img src="/public/empty.png" alt="Empty data" className="img" />
          </div>
          <p>Profile not found.</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
