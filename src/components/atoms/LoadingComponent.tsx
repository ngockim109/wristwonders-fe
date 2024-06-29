import { Spin } from "antd";
import React from "react";

const LoadingComponent = () => {
  return (
    <div className="w-100 h-100 d-flex justify-content-center align-items-center">
      <Spin size="large" />
    </div>
  );
};

export default LoadingComponent;
