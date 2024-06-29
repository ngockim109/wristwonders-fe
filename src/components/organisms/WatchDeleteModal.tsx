import React from "react";
import { Modal, Button } from "antd";
import { toast } from "react-toastify";

const WatchDeleteModal = ({ visible, onClose, onDelete }) => {
  const handleDelete = async () => {
    try {
      await onDelete(); // Attempt to delete
    } catch (error) {
      // Catch any errors and display an appropriate error message
      const errorMessage =
        error?.response?.data?.error ||
        `Error deleting watch: ${error.message}`;
      toast.error(errorMessage);
    } finally {
      onClose(); // Close the modal in both success and failure cases
    }
  };

  return (
    <Modal
      title="Delete Watch"
      visible={visible}
      onOk={handleDelete}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="delete" type="primary" danger onClick={handleDelete}>
          Delete
        </Button>,
      ]}
    >
      <p>Are you sure you want to delete this watch?</p>
    </Modal>
  );
};

export default WatchDeleteModal;
