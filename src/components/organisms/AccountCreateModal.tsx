import React from "react";
import { Modal, Form, Input, Button, Select } from "antd";
import { Option } from "antd/es/mentions";

const AccountCreateModal = ({ visible, onCancel, onCreate }) => {
  const [form] = Form.useForm();

  const handleCreate = async () => {
    const values = await form.validateFields();

    // Convert automatic to boolean if it's returned as a string
    values.isAdmin = values.isAdmin === "true";
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        onCreate(values);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      title="Create Account"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleCreate}>
          Create
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="membername"
          label="Membername"
          rules={[{ required: true, message: "Please input the membername!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please input the password!" }]}
        >
          <Input type="password" minLength={8} />
        </Form.Item>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please input the name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="YOB"
          label="Year of Birth"
          rules={[
            { required: true, message: "Please input the year of birth!" },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="isAdmin"
          label="Role"
          rules={[{ required: true, message: "Please select the role!" }]}
        >
          <Select placeholder="Choose role">
            <Option value={false}>Member</Option>
            <Option value={true}>Admin</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AccountCreateModal;
