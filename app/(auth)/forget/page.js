"use client";

import React, {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Space,
  Typography,
} from "antd";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useAuthContext } from "context/authContext";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { redirect } from "next/navigation";
import { useNotificationContext } from "context/notificationContext";
import axios from "axios-base";

export default function Page() {
  const { loginUser } = useAuthContext();
  const { contentLoad, setContentLoad, setAlert, setError } =
    useNotificationContext();

  useEffect(() => {
    setContentLoad(false);
  }, []);

  const onFinishFailed = (errorInfo) => {};

  const onFinish = async (values) => {
    try {
      await axios.post("/members/forget", values);
      setAlert("Имэйл хаягт илгээлээ");
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      <section>
        <div className="container">
          <div className="login_page">
            <h4> Нууц үг сэргээх </h4>

            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Та өөрийн бүртгэлтэй имэйл хаягаа оруулна уу!",
                  },
                ]}
                className="loginInput"
              >
                <Input
                  size="large"
                  style={{ width: "100%", borderRadius: "2px" }}
                  placeholder="Та имэйл хаягаа оруулна уу"
                  prefix={<UserOutlined />}
                />
              </Form.Item>

              <Form.Item className="login-btn-box">
                <Button
                  size="large"
                  loading={contentLoad}
                  htmlType="submit"
                  className="loginBtn"
                >
                  Баталгаажуулах код авах
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </section>
    </>
  );
}
