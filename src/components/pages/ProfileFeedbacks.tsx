import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "@hooks/useAuth"; // Hook to access authentication context
import api from "@services/api"; // Custom API service
import { Rate } from "antd";

const ProfileFeedbacks = () => {
  const { auth } = useAuth(); // Accessing auth context
  const [feedbacks, setFeedbacks] = useState([]); // State to hold feedbacks
  const [message, setMessage] = useState(""); // Message state for success messages
  const [error, setError] = useState(""); // Error state for error messages

  // Fetch member feedbacks when the component mounts or when auth changes
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const token = auth?.access_token; // Get the access token from auth context
        if (token) {
          const response = await api.get("/members/profile/feedbacks", {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in request headers
            },
          });
          setFeedbacks(response.data.data); // Set feedbacks data
          setMessage(response.data.message); // Set success message
        } else {
          setError("No valid token found."); // Handle missing token error
        }
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch feedbacks."); // Handle fetch error
      }
    };

    fetchFeedbacks();
  }, [auth]);

  return (
    <div className="container mt-3">
      <div className="rounded-1 bg-new-secondary py-2 px-3 mt-3 d-flex align-items-center mb-3">
        <Link className="text-decoration-none" to="/profile">
          Profile
        </Link>
        <i className="bi bi-chevron-right mx-1"></i>
        <span>My feedbacks</span>
      </div>
      <h4 className="mt-3">Your Feedbacks</h4>

      {/* Display feedbacks */}
      {feedbacks.length > 0 ? (
        <div className="card-columns mt-3 mb-4">
          {feedbacks.map((feedback) => (
            <div key={feedback._id} className="card mb-3 shadow-sm">
              <div className="card-body d-flex gap-3">
                <div className="img-watch-admin-container">
                  <img
                    src={feedback.watch.image}
                    alt={feedback.watch.watchName}
                    className="img-watch-admin"
                  />
                </div>
                <div className="d-flex flex-column">
                  <span>{feedback.watch.brand.brandName.toUpperCase()}</span>
                  <span className="fw-bold">{feedback.watch.watchName}</span>
                  <div className="d-flex gap-2 align-items-center">
                    <Rate count={3} disabled defaultValue={feedback?.rating} />
                    <span className="card-text">
                      <small className="text-muted">
                        {/* Format and display createdAt date */}
                        {new Date(feedback.createdAt).toLocaleString()}
                      </small>
                    </span>
                  </div>
                  <p className="card-text mt-2">{feedback.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Display message if no feedbacks available
        <div className="d-flex flex-column align-items-center justify-content-center">
          <div className="img-container my-auto">
            <img src="/public/empty.png" alt="Empty data" className="img" />
          </div>
          <p>You have not left any feedbacks yet.</p>
        </div>
      )}
    </div>
  );
};

export default ProfileFeedbacks;
