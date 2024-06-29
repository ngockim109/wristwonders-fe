import React from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { formatDate } from "@utils/FormatDateTime";
import { IBrand } from "@interfaces/brand.interface";

interface BrandListProps {
  brands: IBrand[];
  onEdit: (brand: IBrand) => void;
  onDelete: (brand: IBrand) => void;
}

const BrandList: React.FC<BrandListProps> = ({ brands, onEdit, onDelete }) => {
  const columns = [
    { title: "Brand Id", dataIndex: "_id", key: "_id" },
    {
      title: "Brand Name",
      dataIndex: "brandName",
      key: "brandName",
      render: (text: string) => text.toUpperCase(),
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => formatDate(date),
    },
    {
      title: "Updated Date",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (date: string) => formatDate(date),
    },
    {
      title: <div className="d-flex justify-content-center">Actions</div>,
      dataIndex: "actions",
      key: "actions",
      render: (_: unknown, record: IBrand) => (
        <div className="d-flex gap-3 justify-content-center">
          <button type="button" className="btn bg-custom">
            <Link
              to={`/brands/${record?._id}`}
              className="text-white text-decoration-none"
            >
              <i className="bi bi-eye d-flex justify-content-center align-items-center text-dark"></i>
            </Link>
          </button>
          <button
            type="button"
            className="btn bg-custom "
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
  const generateRowKey = (record: IBrand) => {
    return record?._id || `fallback-${Math.random().toString(36).substr(2, 9)}`;
  };

  return (
    <Table dataSource={brands} columns={columns} rowKey={generateRowKey} />
  );
};

export default BrandList;
