import { Modal, Form, Input } from "antd";
import { useState } from "react";

export default function LinksModal({ open, onCancel, onAdd }) {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((values) => {
      onAdd(values);
      form.resetFields();
    });
  };

  return (
    <Modal
      title="Холбоос нэмэх"
      open={open}
      onCancel={onCancel}
      onOk={handleOk}
      okText="Нэмэх"
      cancelText="Болих"
    >
      <Form form={form} layout="vertical">
        <Form.Item name="name" label="Сайтын нэр" rules={[{ required: true }]}>
          <Input placeholder="facebook, twitter, website... гэх мэт" />
        </Form.Item>
        <Form.Item name="url" label="Линк" rules={[{ required: true }]}>
          <Input placeholder="https://..." />
        </Form.Item>
      </Form>
    </Modal>
  );
}
