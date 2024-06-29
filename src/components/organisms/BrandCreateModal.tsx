import React from "react";
import { Modal, Form, Input, Button } from "antd";
import { toast } from "react-toastify";

const BrandCreateModal = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      // Validate form fields
      const values = await form.validateFields();
      form.resetFields();

      // Call onCreate and handle any server errors
      await onCreate(values);
    } catch (error) {
      // Check if the error is from form validation
      if (error.name === "Error" && error.message === "Validation failed") {
        toast.error("Please fill out the required fields.");
      } else {
        // Assume error is from API call if it's not a validation error
        const errorMessage =
          error.response?.data?.error || "Failed to create brand!";
        toast.error(errorMessage);
      }
    }
  };

  return (
    <Modal
      visible={visible}
      title="Create New Brand"
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="create" type="primary" onClick={handleOk}>
          Create
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="brandName"
          label="Brand name:"
          rules={[{ required: true, message: "Please enter brand name" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BrandCreateModal;
