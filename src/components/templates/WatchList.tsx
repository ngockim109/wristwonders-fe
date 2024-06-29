import React from "react";
import { Table } from "antd";
import { formatDate } from "@utils/FormatDateTime";
import CustomTag from "@components/atoms/CustomTag";
import { Link } from "react-router-dom";

const WatchList = ({ watches, onEdit, onDelete }) => {
  const columns = [
    {
      title: "Watch Id",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Watch Name",
      dataIndex: "watchName",
      key: "watchName",
    },
    {
      title: "Brand",
      dataIndex: ["brand", "brandName"],
      key: "brandName",
      render: (text) => text.toUpperCase(),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => (
        <div className="d-flex justify-content-start w-100 h-100">{text}</div>
      ),
    },
    {
      title: "Automatic",
      dataIndex: "automatic",
      key: "automatic",
      render: (automatic) => (
        <div className="d-flex justify-content-center w-100 h-100">
          <CustomTag type={automatic ? "Automatic" : "Non-automatic"} />
        </div>
      ),
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => formatDate(createdAt),
    },
    {
      title: "Updated Date",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updatedAt) => formatDate(updatedAt),
    },
    {
      title: <div className="d-flex justify-content-center">Actions</div>,
      key: "actions",
      render: (text, record) => (
        <div className="d-flex gap-3 justify-content-center w-100 h-100">
          <button type="button" className="btn bg-custom">
            <Link
              to={`/watches/${record?._id}`}
              className="text-white text-decoration-none"
            >
              <i className="bi bi-eye d-flex justify-content-center align-items-center text-dark"></i>
            </Link>
          </button>
          <button
            type="button"
            className="btn bg-custom"
            onClick={() => onEdit(record)}
          >
            <i className="bi bi-pencil-square d-flex justify-content-center align-items-center"></i>
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => onDelete(record)}
          >
            <i className="bi bi-trash d-flex justify-content-center align-items-center"></i>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table
        dataSource={watches}
        columns={columns}
        rowKey={(record) => record?._id}
      />
    </div>
  );
};

export default WatchList;
