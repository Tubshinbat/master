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
import Header from "components/Generals/Header";
import useWebInfo from "hooks/useWebInfo";
import useMenus from "hooks/useMenus";

export default function Page() {
  const { loginUser } = useAuthContext();
  const { contentLoad, setContentLoad } = useNotificationContext();

  useEffect(() => {
    setContentLoad(false);
  }, []);

  const onFinishFailed = (errorInfo) => {};

  const onFinish = async (values) => {
    await loginUser(values);
  };

  return (
    <>
      <section>
        <div className="container">
          <div className="login_page">
            <h4> Гишүүн нэвтрэх </h4>

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
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Нууц үгээ оруулна уу",
                  },
                ]}
                className="loginInput"
              >
                <Input.Password
                  size="large"
                  placeholder="Нууц үгээ оруулна уу"
                  prefix={<KeyOutlined />}
                />
              </Form.Item>

              <Form.Item className="login-btn-box">
                <Button
                  size="large"
                  loading={contentLoad}
                  htmlType="submit"
                  className="loginBtn"
                >
                  Нэвтрэх
                </Button>
              </Form.Item>
              <div className="login-page-register">
                Мартсан? <Link href="/forget"> Нууц үг сэргээх </Link>
              </div>
              <Form.Item>
                <Link href="/register">
                  <Button
                    size="large"
                    htmlType="button"
                    className="registerBtn"
                  >
                    Бүртгүүлэх
                  </Button>
                </Link>
              </Form.Item>
            </Form>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        </div>
      </section>
    </>
  );
}
