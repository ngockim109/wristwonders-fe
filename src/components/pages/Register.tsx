import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import api from "@services/api";
import useAuth from "@hooks/useAuth";

const Register = () => {
  const [membername, setMembername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [YOB, setYOB] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/register", {
        membername,
        password,
        name,
        YOB,
      });
      if (response.status === 201) {
        console.log(response);
        const { message, token } = response.data;
        toast.success(message);
        login(token);
        navigate(from, { replace: true });
      }
      // setMessage(response.data.message);
      // setErrors({});
      // toast.success("Registration successful!");
      // navigate("/auth/login");
    } catch (error) {
      toast.error(error?.response?.data?.error ?? "Register failed!");
    }
  };

  return (
    <div className="container mt-5 mb-4">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
      />
      <div className="d-flex justify-content-center w-100">
        <h2 className="mx-auto">Register</h2>
      </div>
      <div className="w-50 mx-auto">
        {message && (
          <div className="alert alert-success" role="alert">
            {message}
          </div>
        )}
        {Object.keys(errors).length > 0 && (
          <div className="alert alert-danger d-flex flex-column" role="alert">
            {Object.values(errors).map((err, idx) => (
              <div key={idx}>{err}</div>
            ))}
          </div>
        )}
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
          <p className="text-danger">{errors.membername}</p>

          <label htmlFor="password" className="form-label mt-2">
            Password
          </label>
          <input
            className="form-control"
            type="password"
            id="password"
            name="password"
            required
            minLength="8"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-danger">{errors.password}</p>

          <label htmlFor="name" className="form-label mt-2">
            Full Name
          </label>
          <input
            className="form-control"
            type="text"
            id="name"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p className="text-danger">{errors.name}</p>

          <label htmlFor="YOB" className="form-label mt-2">
            Year of Birth
          </label>
          <input
            className="form-control"
            type="number"
            id="YOB"
            name="YOB"
            required
            value={YOB}
            onChange={(e) => setYOB(e.target.value)}
          />
          <p className="text-danger">{errors.YOB}</p>

          <div className="d-flex flex-column justify-content-center align-items-center mt-3">
            <button className="btn btn-dark w-100 mb-2" type="submit">
              Register
            </button>
            <p className="mt-3">
              <span className="text-secondary">Already have an account?</span>
              <a
                href="/auth/login"
                className="text-decoration-none text-primary"
              >
                Login now
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
