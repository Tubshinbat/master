"use client";

import Loader from "components/Generals/Loader";
import Side from "components/Userprofile/Side";
import { useAuthContext } from "context/authContext";
import { useNotificationContext } from "context/notificationContext";
import { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Select, TreeSelect } from "antd";
import base from "lib/base";
import { createUser, updateUser } from "lib/actionFetch";
import { getMemberCategories, getPartners } from "lib/getFetchers";
import { Editor } from "@tinymce/tinymce-react";
import TextArea from "antd/es/input/TextArea";
import axios from "axios-base";
import { useRouter } from "next/navigation";
import { convertFromdata } from "lib/check";
import Spinner from "components/Generals/Spinner";

export default function RootLayout({ children }) {
  const { user, setUser } = useAuthContext();
  const { contentLoad, setError, setAlert } = useNotificationContext();
  const [partners, setPartners] = useState([]);
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState();
  const router = useRouter();
  const [form] = Form.useForm();

  const handleChange = (event) => {
    form.setFieldsValue({ about: event });
  };

  const handleEdit = async (values) => {
    values.status = false;

    const data = {
      ...values,
    };

    if (data.category.length === 0) data.category = [];

    const sendData = convertFromdata(data);
    if (user) {
      setLoading(true);
      try {
        const { update } = await updateUser(user, sendData);
        if (update.data.data) {
          setUser({ ...update.data.data });
        }
        setLoading(false);
        setAlert("Мэдээлэл амжилтай шинжлэгдлээ");
      } catch (error) {
        setError(error);
      }
    } else setError("Холболт салсан байна");
  };

  const onChange = (newValue) => {
    setValue(newValue);
  };

  if (contentLoad || !user)
    return (
      <>
        <section className="profile-section">
          <div className="container">
            <div className="row">
              <Loader />
            </div>
          </div>
        </section>
      </>
    );

  useEffect(() => {
    const fetchDatas = async () => {
      const { partners } = await getPartners(`status=true`);
      const { categories } = await getMemberCategories(``);
      setCategories(categories);
      if (partners) {
        let data = [];

        data = partners.map((el) => ({
          value: el._id,
          label: el.name,
        }));
        data.push({ value: null, label: "Харьяалалгүй" });
        setPartners(data);
      }
    };

    fetchDatas().catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (user) {
      form.setFieldsValue({ ...user });
    }
  }, [user]);

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
                {loading && <Spinner />}
                <div className="pro-box user-form-box">
                  <div className="user-form-header">
                    <h4> Хувийн мэдээлэл </h4>
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
                            name="lastName"
                            label="Овог"
                            rules={[
                              {
                                required: true,
                                message: "Овог нэрээ оруулна уу!",
                              },
                            ]}
                          >
                            <Input size="middle" placeholder="Овог" />
                          </Form.Item>
                        </div>
                        <div className="col-lg-6">
                          <Form.Item
                            name="name"
                            label="Нэр"
                            rules={[
                              {
                                required: true,
                                message: "Нэрээ оруулна уу!",
                              },
                            ]}
                          >
                            <Input size="middle" placeholder="Нэр" />
                          </Form.Item>
                        </div>
                        <div className="col-lg-12">
                          <Form.Item
                            name="category"
                            label="Салбар"
                            rules={[
                              {
                                required: true,
                                message: "Салбар сонгоно уу!",
                              },
                            ]}
                          >
                            <TreeSelect
                              showSearch
                              style={{
                                width: "100%",
                              }}
                              value={value}
                              dropdownStyle={{
                                maxHeight: 400,
                                overflow: "auto",
                              }}
                              placeholder="Сонгоно уу"
                              allowClear
                              multiple
                              treeNodeFilterProp="title"
                              treeDefaultExpandAll
                              onChange={onChange}
                              treeData={categories}
                            />
                          </Form.Item>
                        </div>
                        <div className="col-lg-6">
                          <Form.Item
                            name="position"
                            label="Цол гуншин"
                            rules={[
                              {
                                required: true,
                                message: "Цол гуншин оруулна уу!",
                              },
                            ]}
                          >
                            <Input size="middle" placeholder="Цол гуншин" />
                          </Form.Item>
                        </div>
                        <div className="col-lg-6">
                          <Form.Item
                            name="partner"
                            label="Харьяалагддаг байгууллага"
                          >
                            <Select
                              showSearch
                              optionFilterProp="label"
                              style={{ width: "100%" }}
                              placeholder="Харьяалагддаг байгууллага сонгоно уу"
                              options={partners}
                            ></Select>
                          </Form.Item>
                        </div>
                        <div className="col-lg-6">
                          {" "}
                          <Form.Item
                            name="email"
                            label="Имэйл хаяг"
                            hasFeedback
                            rules={[
                              {
                                required: true,
                                message: "Тус талбарыг заавал бөглөнө үү",
                              },
                              {
                                type: "email",
                                message: "Имэйл хаяг буруу байна!",
                              },
                            ]}
                          >
                            <Input placeholder="Имэйл хаягаа оруулна уу" />
                          </Form.Item>
                        </div>
                        <div className="col-lg-6">
                          {" "}
                          <Form.Item
                            label="Утасны дугаар"
                            name="phoneNumber"
                            rules={[
                              {
                                required: true,
                                message: "Тус талбарыг заавал бөглөнө үү",
                              },
                            ]}
                            hasFeedback
                          >
                            <InputNumber
                              placeholder="Утасны дугаараа оруулна уу"
                              style={{ width: "100%" }}
                            />
                          </Form.Item>
                        </div>
                        <div className="col-lg-12">
                          <Form.Item label="Товч танилцуулга" name="shortAbout">
                            <TextArea
                              placeholder="Товч танилцуулга"
                              autoSize={{
                                minRows: 2,
                                maxRows: 6,
                              }}
                            />
                          </Form.Item>
                        </div>
                        <div className="col-lg-12">
                          <Form.Item
                            label="Дэлгэрэнгүй танилцуулга"
                            name="about"
                            getValueFromEvent={(e) =>
                              e.target && e.target.getContent()
                            }
                            rules={[
                              {
                                required: true,
                                message: "Тус талбарыг заавал бөглөнө үү",
                              },
                            ]}
                          >
                            <Editor
                              apiKey="2nubq7tdhudthiy6wfb88xgs36os4z3f4tbtscdayg10vo1o"
                              init={{
                                height: 300,
                                menubar: false,
                                plugins:
                                  "advlist textcolor autolink lists link image charmap print preview anchor tinydrive searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount image media  code  table",

                                toolbar:
                                  "undo redo | mybutton | addPdf |  image |  fontselect fontsizeselect formatselect blockquote  | bold italic forecolor  backcolor | \
                                  alignleft aligncenter alignright alignjustify | \
                                  bullist numlist outdent indent | removeformat | help | link  | quickbars | media | code | tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol",
                                file_picker_types: "image",
                                tinydrive_token_provider: `${base.apiUrl}/users/jwt`,
                                automatic_uploads: false,
                                setup: (editor) => {
                                  editor.ui.registry.addButton("mybutton", {
                                    text: "Файл оруулах",
                                    onAction: () => {
                                      var input =
                                        document.createElement("input");
                                      input.setAttribute("type", "file");
                                      input.onchange = async function () {
                                        var file = this.files[0];
                                        const fData = new FormData();
                                        fData.append("file", file);
                                        const res = await axios.post(
                                          "/file/member",
                                          fData
                                        );
                                        const url =
                                          `${base.cdnUrl}/` + res.data.data;
                                        editor.insertContent(
                                          `<a href="${url}"> ${res.data.data} </a>`
                                        );
                                      };
                                      input.click();
                                    },
                                  });
                                  editor.ui.registry.addButton("addPdf", {
                                    text: "PDF Файл оруулах",
                                    onAction: () => {
                                      let input =
                                        document.createElement("input");
                                      input.setAttribute("type", "file");
                                      input.setAttribute("accept", ".pdf");
                                      input.onchange = async function () {
                                        let file = this.files[0];
                                        const fData = new FormData();
                                        fData.append("file", file);

                                        const res = await axios.post(
                                          "/file",
                                          fData
                                        );
                                        const url =
                                          base.cdnUrl + "/" + res.data.data;
                                        editor.insertContent(
                                          `<iframe src="${url}" style="width:100%; min-height: 500px"> </iframe>`
                                        );
                                      };
                                      input.click();
                                    },
                                  });
                                },
                                file_picker_callback: function (cb) {
                                  var input = document.createElement("input");
                                  input.setAttribute("type", "file");
                                  input.setAttribute("accept", "image/*");
                                  input.onchange = async function () {
                                    var file = this.files[0];
                                    const fData = new FormData();
                                    fData.append("file", file);
                                    const res = await axios.post(
                                      "/imgupload/memberupload",
                                      fData
                                    );
                                    const url =
                                      `${base.cdnUrl}/` + res.data.data;
                                    cb(url);
                                  };
                                  input.click();
                                },
                              }}
                              onEditorChange={(event) => handleChange(event)}
                            ></Editor>
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
                            handleEdit(values);
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
