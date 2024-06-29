import React, { useState, useEffect } from "react";
import { Button, Alert } from "antd";
import api from "@services/api";
import AccountCreateModal from "@components/organisms/AccountCreateModal";
import AccountList from "@components/templates/AccountList";
import LoadingComponent from "@components/atoms/LoadingComponent";
import { ToastContainer, toast } from "react-toastify";

const Account = () => {
  const [accounts, setAccounts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      const response = await api.get("/members");
      if (response) {
        console.log(response.data);
        setAccounts(response.data.data);
      } else {
        console.error("Failed to fetch accounts");
      }
    } catch (error) {
      console.error("Error fetching accounts:", error);
      setError("Error fetching accounts.");
    } finally {
      setLoading(false);
    }
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleCreate = async (values) => {
    try {
      const response = await api.post("/accounts", values);
      if (response.status === 201) {
        setMessage("Account created successfully!");
        toast.success("Account created successfully!");
        setModalVisible(false);
        fetchAccounts();
      } else {
        setError("Failed to create account.");
        toast.error("Failed to create account!");
      }
    } catch (error) {
      console.error("Error creating account:", error);
      toast.error(
        error?.response?.data?.error ?? "Error creating account:",
        error,
      );
      setError("Error creating account.");
    }
  };

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <div className="mt-4 px-3">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
      />
      <h2 className="px-3 pt-3">Account Management</h2>

      <div className="d-flex justify-content-end px-4">
        <Button
          type="primary"
          className="bg-custom text-dark fw-bold"
          onClick={showModal}
        >
          Create Account
        </Button>
      </div>

      {/* Create Account Modal */}
      <AccountCreateModal
        visible={modalVisible}
        onCancel={handleCancel}
        onCreate={handleCreate}
      />

      {/* Account List */}
      <AccountList accounts={accounts} />
    </div>
  );
};

export default Account;
