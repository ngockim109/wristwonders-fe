import React from "react";
import { Table, Button } from "antd";
import CustomTag from "@components/atoms/CustomTag";
import { IMember } from "@interfaces/member.interface";

interface AccountListProps {
  accounts: IMember[];
}

const AccountList: React.FC<AccountListProps> = ({ accounts }) => {
  const columns = [
    {
      title: "Member Id",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Membername",
      dataIndex: "membername",
      key: "membername",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "YOB",
      dataIndex: "YOB",
      key: "YOB",
    },
    {
      title: "Role",
      dataIndex: "isAdmin",
      key: "isAdmin",
      render: (isAdmin: boolean) => (
        <div className="d-flex justify-content-center">
          <CustomTag type={isAdmin ? "Admin" : "Member"} />
        </div>
      ),
    },
    {
      title: "Joined Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => new Date(createdAt).toLocaleDateString(), // Format as needed
    },
    {
      title: "Updated Date",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updatedAt: string) => new Date(updatedAt).toLocaleDateString(), // Format as needed
    },
    {
      title: <div className="d-flex justify-content-center">Actions</div>,
      key: "actions",
      render: (_text: unknown, record: IMember) => (
        <div className="d-flex gap-3 justify-content-center">
          <Button
            type="link"
            href={`/accounts/${record?._id}`}
            className="bg-custom"
          >
            <i className="bi bi-eye d-flex justify-content-center align-items-center text-dark"></i>
          </Button>
        </div>
      ),
    },
  ];
  const generateRowKey = (record: IMember) => {
    return record?._id || `fallback-${Math.random().toString(36).substr(2, 9)}`;
  };
  return (
    <Table dataSource={accounts} columns={columns} rowKey={generateRowKey} />
  );
};

export default AccountList;
