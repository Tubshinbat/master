"use client";

import Side from "components/Userprofile/Side";
import { useAuthContext } from "context/authContext";
import Spinner from "components/Generals/Spinner";
import { Button, Form, Input } from "antd";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios-base";
import { useNotificationContext } from "context/notificationContext";
import { changePassword } from "lib/actionFetch";

export default function RootLayout({ children }) {
  const { user } = useAuthContext();
  const { setError, setAlert } = useNotificationContext();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [form] = Form.useForm();

  const handlePassword = async (values) => {
    try {
      const result = await changePassword(user, values);
      if (result) {
        setAlert("Амжилттай нууц үг шинжлэгдлээ");
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      <section className="profile-section">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <Side />
            </div>
            <div className="col-md-9">
              <div className="user-box">
                <div className="pro-box user-form-box">
                  {loading && <Spinner />}
                  <div className="user-form-header">
                    <h4> Нууц үг </h4>
                  </div>
                  <div className="user-form-control">
                    <Form
                      name="basic"
                      layout="vertical"
                      initialValues={{
                        remember: true,
                      }}
                      form={form}
                    >
                      <div className="row">
                        <div className="col-lg-6">
                          <Form.Item
                            name="oldPassword"
                            label="Одоогийн нууц үг"
                            rules={[
                              {
                                required: true,
                                message: "Одоогийн нууц үгээ оруулна уу?",
                              },
                            ]}
                          >
                            <Input.Password
                              size="middle"
                              placeholder="Одоогийн нууц үг"
                            ></Input.Password>
                          </Form.Item>
                        </div>
                        <div className="col-lg-6"></div>
                        <div className="col-lg-6">
                          <Form.Item
                            label="Шинэ нууц үг"
                            name="password"
                            rules={[
                              {
                                required: true,
                                message: "Шинэ нууц үгээ оруулна уу",
                              },
                            ]}
                            hasFeedback
                          >
                            <Input.Password placeholder="Шинэ нууц үгээ оруулна уу" />
                          </Form.Item>
                        </div>
                        <div className="col-lg-6">
                          <Form.Item
                            name="confirm"
                            label="Шинэ нууц үг баталгаажуулах"
                            dependencies={["password"]}
                            rules={[
                              {
                                required: true,
                                message: "Шинэ нууц үг баталгаажуулана уу",
                              },
                              ({ getFieldValue }) => ({
                                validator(_, value) {
                                  if (
                                    !value ||
                                    getFieldValue("password") === value
                                  ) {
                                    return Promise.resolve();
                                  }

                                  return Promise.reject(
                                    new Error(
                                      "Эхний оруулсан нууц үгтэй тохирохгүй байна!"
                                    )
                                  );
                                },
                              }),
                            ]}
                            hasFeedback
                          >
                            <Input.Password placeholder="Шинэ нууц үгээ баталгаажуулана уу" />
                          </Form.Item>
                        </div>
                      </div>
                    </Form>
                  </div>
                  <div className="user-form-bottom">
                    <Button
                      key="submit"
                      htmlType="submit"
                      className="save-button"
                      onClick={() => {
                        form
                          .validateFields()
                          .then((values) => {
                            handlePassword(values);
                          })
                          .catch((info) => {
                            // console.log(info);
                          });
                      }}
                    >
                      Хадгалах
                    </Button>

                    <Button
                      key="submit"
                      htmlType="submit"
                      onClick={() => {
                        router.back();
                      }}
                    >
                      Буцах
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
