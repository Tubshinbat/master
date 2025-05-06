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
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { redirect } from "next/navigation";
import { useNotificationContext } from "context/notificationContext";
import axios from "axios-base";
import Loader from "components/Generals/Loader";
import Spinner from "components/Generals/Spinner";

export default function Page({ params }) {
  const { contentLoad, setContentLoad, setAlert, setError } =
    useNotificationContext();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setContentLoad(false);
    const fetchData = async () => {
      try {
        await axios.post("/members/resetToken", {
          resetToken: params.resetToken,
        });
        setLoading(false);
        setOpen(true);
      } catch (error) {
        setError(error);
        setTimeout(() => {
          window.location.replace("/forget");
        }, 3000);
      }
    };
    fetchData().catch((error) => console.log(error));
  }, []);

  if (loading && !open) {
    return (
      <>
        <section>
          <div className="container">
            <Loader />
          </div>
        </section>
      </>
    );
  }

  const onFinishFailed = (errorInfo) => {};

  const onFinish = async (values) => {
    try {
      const data = {
        ...values,
        resetToken: params.resetToken,
      };
      setLoading(true);
      await axios.post("/members/forgetpasswordchange", data);
      setAlert("Таны нууц амжилтай солигдлоо");
      setLoading(false);
      setTimeout(() => {
        window.location.replace("/login");
      }, 3000);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return (
    <>
      <section>
        <div className="container">
          <div className="login_page">
            {loading && <Spinner />}
            <h4> Шинэ нууц үгээ оруулна уу </h4>

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
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Тус талбарыг заавал бөглөнө үү",
                  },
                ]}
                hasFeedback
              >
                <Input.Password
                  style={{ width: "100%", borderRadius: "2px" }}
                  size="large"
                  placeholder="Нууц үгээ оруулна уу"
                />
              </Form.Item>
              <Form.Item
                name="confirm"
                dependencies={["password"]}
                rules={[
                  {
                    required: true,
                    message: "Тус талбарыг заавал бөглөнө үү",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject(
                        new Error("Эхний оруулсан нууц үгтэй тохирохгүй байна!")
                      );
                    },
                  }),
                ]}
                hasFeedback
              >
                <Input.Password
                  size="large"
                  style={{ width: "100%", borderRadius: "2px" }}
                  placeholder="Нууц үгээ давтан оруулна уу"
                />
              </Form.Item>

              <Form.Item className="login-btn-box">
                <Button
                  size="large"
                  loading={loading}
                  htmlType="submit"
                  className="loginBtn"
                >
                  Шинэчлэх
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </section>
    </>
  );
}
