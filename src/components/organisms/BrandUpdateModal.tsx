import React from "react";
import { Modal, Form, Input, Button } from "antd";
import { toast } from "react-toastify";

const BrandUpdateModal = ({ visible, onClose, onUpdate, initialValues }) => {
  const handleUpdate = async (values) => {
    try {
      await onUpdate(values);
      onClose();
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || `Error updating brand: ${error.message}`;
      toast.error(errorMessage);
    }
  };

  return (
    <Modal
      title="Update Brand"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form onFinish={handleUpdate} initialValues={initialValues}>
        <Form.Item
          label="New Brand Name"
          name="brandName"
          rules={[{ required: true, message: "Please input the brand name!" }]}
        >
          <Input />
        </Form.Item>
        <div className="d-flex justify-content-end">
          <Button type="primary" className="bg-dark" htmlType="submit">
            Update
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default BrandUpdateModal;
