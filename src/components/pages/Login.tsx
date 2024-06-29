import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "@hooks/useAuth";
import { useNavigate } from "react-router-dom";
import api from "@services/api";

const Login = () => {
  console.log("login");
  const [membername, setMembername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { membername, password });
      const { message, token } = response.data;
      toast.success(message);
      login(token);
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.response.data.error);
      // Handle login errors
      console.error("Login error:", error);
    }
  };

  return (
    <div className="container mt-5 mb-3">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
      />
      <div className="mx-auto d-flex justify-content-center w-100">
        <h2 className="mx-auto">Login</h2>
      </div>
      <div className="w-50 mx-auto">
        <form onSubmit={handleSubmit}>
          <label htmlFor="membername" className="form-label">
            Membername
          </label>
          <input
            className="form-control"
            type="text"
            id="membername"
            name="membername"
            required
            value={membername}
            onChange={(e) => setMembername(e.target.value)}
          />
          <label htmlFor="password" className="form-label mt-2">
            Password
          </label>
          <input
            className="form-control"
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="d-flex flex-column justify-content-center align-items-center mt-3">
            <button className="btn btn-dark w-100 mb-2" type="submit">
              Login
            </button>
            <p className="mt-3">
              <span>Don't have an account yet? </span>
              <a
                href="/auth/register"
                className="text-decoration-none text-primary"
              >
                Register now
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
