import React from "react";

const Forbidden = () => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1 className="display-1 fw-bold">403</h1>
        <p className="fs-3">
          {" "}
          <span className="text-danger">Opps!</span> Forbidden
        </p>
        <p className="lead">You do not have permission to access this page.</p>
        <a href="/" className="btn btn-primary">
          Go Home
        </a>
      </div>
    </div>
  );
};

export default Forbidden;
