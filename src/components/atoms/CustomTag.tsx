import React from "react";
import { Tag } from "antd";

const tagStyles = {
  Admin: { color: "#dc3545", text: "Admin" },
  Member: { color: "#0dcaf0", text: "Member" },
  Automatic: { color: "#dc3545", text: "Automatic" },
  "Non-automatic": { color: "#6c757d", text: "Non-automatic" },
};

const CustomTag = ({ type }) => {
  const { color, text } = tagStyles[type] || { color: "default", text: type };

  return <Tag color={color}>{text}</Tag>;
};

export default CustomTag;
