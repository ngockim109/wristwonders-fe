import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import api from "@services/api";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state for authentication operations

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        setAuth({ member: decodedUser, access_token: token });
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }

    setLoading(false); // Update loading state after initial authentication check
  }, []);

  const login = (token) => {
    setLoading(true); // Set loading state when logging in
    try {
      const decodedUser = jwtDecode(token);
      setAuth({ member: decodedUser, access_token: token });
      localStorage.setItem("access_token", token); // Store token in localStorage
    } catch (error) {
      console.error("Invalid token:", error);
    } finally {
      setLoading(false); // Clear loading state after login attempt
    }
  };

  const logout = async () => {
    setLoading(true); // Set loading state when logging out
    try {
      await api.get("/auth/logout");
      setAuth(null);
      localStorage.removeItem("access_token");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false); // Clear loading state after logout attempt
    }
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
