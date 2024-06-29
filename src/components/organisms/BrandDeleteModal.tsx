import React from "react";
import { Modal, Button } from "antd";
import { toast } from "react-toastify";

const BrandDeleteModal = ({ visible, onClose, onDelete }) => {
  const handleDelete = async () => {
    try {
      await onDelete();
      onClose();
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || `Error deleting brand: ${error.message}`;
      toast.error(errorMessage);
    }
  };

  return (
    <Modal
      title="Delete Brand"
      visible={visible}
      onCancel={onClose}
      onOk={handleDelete}
      okText="Delete"
      okType="danger"
    >
      <p>Are you sure you want to delete this brand?</p>
    </Modal>
  );
};

export default BrandDeleteModal;
