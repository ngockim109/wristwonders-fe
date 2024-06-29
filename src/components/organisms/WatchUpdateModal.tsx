import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, InputNumber } from "antd";
import { toast } from "react-toastify";

const { Option } = Select;

const WatchUpdateModal = ({
  visible,
  onClose,
  onUpdate,
  initialValues,
  brands,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      form.setFieldsValue(initialValues);
    }
  }, [visible, initialValues]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      // Call the onUpdate function and await its result in case it's asynchronous
      await onUpdate({ ...values, brandName: values.brandId });
    } catch (error) {
      // Handle validation errors (from form.validateFields)
      if (error?.name === "ValidationError") {
        toast.error("Validation failed. Please check the form fields.");
      } else {
        // Handle API errors or any other errors during the update process
        const errorMessage =
          error?.response?.data?.error ||
          `Error updating watch: ${error.message}`;
        toast.error(errorMessage);
      }
    }
  };

  return (
    <Modal
      title="Update Watch"
      visible={visible}
      onOk={handleOk}
      onCancel={onClose}
      okText="Update"
      cancelText="Cancel"
    >
      <Form form={form} layout="vertical" initialValues={initialValues}>
        <Form.Item
          name="watchName"
          label="Watch Name"
          rules={[{ required: true, message: "Please enter the watch name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="image"
          label="Image URL"
          rules={[{ required: true, message: "Please enter the image URL" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: "Please enter the price" }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="automatic"
          label="Automatic"
          rules={[
            {
              required: true,
              message: "Please select if the watch is automatic",
            },
          ]}
        >
          <Select>
            <Option value={true}>Yes</Option>
            <Option value={false}>No</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="watchDescription"
          label="Watch Description"
          rules={[
            { required: true, message: "Please enter the watch description" },
          ]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item
          name="brandId"
          label="Brand"
          rules={[{ required: true, message: "Please select a brand" }]}
        >
          <Select>
            {brands.map((brand) => (
              <Option key={brand._id} value={brand._id}>
                {brand.brandName}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default WatchUpdateModal;
