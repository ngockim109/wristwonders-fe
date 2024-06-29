import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@context/AuthContext";
import { AppRouter } from "@routes/router";
import ErrorBoundary from "@utils/ErrorBoundary";

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <ErrorBoundary>
          <AuthProvider>
            <Routes>
              <Route path="/*" element={<AppRouter />} />
            </Routes>
          </AuthProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
