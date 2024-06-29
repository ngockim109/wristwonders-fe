import React from "react";
import { Modal, Form, Input, Select, Button, InputNumber } from "antd";
import { IBrand } from "@interfaces/brand.interface";
import { toast } from "react-toastify";

const { Option } = Select;

interface WatchCreateModalProps {
  visible: boolean;
  onCreate: (values: any) => Promise<void>;
  onCancel: () => void;
  brands: IBrand[];
}

const WatchCreateModal: React.FC<WatchCreateModalProps> = ({
  visible,
  onCreate,
  onCancel,
  brands,
}) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      // Validate form fields and get values
      const values = await form.validateFields();

      // Convert automatic to boolean if it's returned as a string
      values.automatic = values.automatic === "true";

      // Call onCreate function and handle form submission
      await onCreate(values);
      form.resetFields(); // Reset form fields after successful submission
    } catch (error) {
      if (error.name === "Error" && error.message === "Validation failed") {
        toast.error("Please fill out the required fields.");
      } else {
        const errorMessage =
          error.response?.data?.error || "Failed to create watch!";
        toast.error(errorMessage);
      }
    }
  };

  return (
    <Modal
      title="Create Watch"
      visible={visible}
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
          name="watchName"
          label="Watch Name"
          rules={[{ required: true, message: "Please enter the watch name" }]}
        >
          <Input placeholder="Enter a watch name" />
        </Form.Item>

        <Form.Item
          name="image"
          label="Image URL"
          rules={[
            { required: true, message: "Please enter the image URL" },
            { type: "url", message: "Please enter a valid URL" },
          ]}
        >
          <Input placeholder="Enter a valid URL" />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: "Please enter the price" }]}
        >
          <InputNumber
            min={0}
            style={{ width: "100%" }}
            placeholder="Enter a price"
          />
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
          <Select placeholder="Choose automatic">
            <Option value={false}>No</Option>
            <Option value={true}>Yes</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="watchDescription"
          label="Watch Description"
          rules={[
            { required: true, message: "Please enter the watch description" },
          ]}
        >
          <Input.TextArea rows={3} placeholder="Enter description" />
        </Form.Item>

        <Form.Item
          name="brand"
          label="Brand"
          rules={[{ required: true, message: "Please select a brand" }]}
        >
          <Select placeholder="Choose a brand">
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

export default WatchCreateModal;
