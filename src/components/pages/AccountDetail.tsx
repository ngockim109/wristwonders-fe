import React from "react";
import { useState, useEffect } from "react";
import api from "@services/api";
import { useParams } from "react-router-dom";
import CustomTag from "@components/atoms/CustomTag";
import { IMember } from "@interfaces/member.interface";
import LoadingComponent from "@components/atoms/LoadingComponent";

const AccountDetail = () => {
  const [user, setUser] = useState<IMember>({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isEmptyUser, setIsEmptyUser] = useState(true);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/accounts/${id}`);

        if (!response) {
          throw new Error("Network response was not ok");
        }
        setUser(response.data.data);
        setIsEmptyUser(Object.keys(response.data.data).length === 0);
        setMessage("User account loaded successfully!");
      } catch (error) {
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);
  if (loading) {
    return <LoadingComponent />;
  }
  return (
    <>
      {isEmptyUser ? (
        <div className="img-container my-auto">
          <img src="/public/empty.png" alt="Empty data" className="img" />
        </div>
      ) : (
        <div>
          <div className="container mt-4">
            <div className="d-flex align-items-center gap-2">
              <h2>{user.name}</h2>
            </div>

            <div className="card">
              <div className="card-header">Account Information</div>
              <div className="card-body d-flex gap-4">
                <div>
                  <p className="card-text">
                    <strong>Membername:</strong> {user.membername}
                    <br />
                    <strong>Member Id:</strong> {user._id}
                    <br />
                    <strong>Year of birth:</strong> {user.YOB}
                    <br />
                    <strong>Role:</strong>{" "}
                    <CustomTag type={user.isAdmin ? "Admin" : "Member"} />
                    <br />
                    <strong>Joined Date:</strong>{" "}
                    {new Date(user.createdAt).toLocaleDateString()}
                    <br />
                    <strong>Updated Date:</strong>{" "}
                    {new Date(user.updatedAt).toLocaleDateString()}
                    <br />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccountDetail;
