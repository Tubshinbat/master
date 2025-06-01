"use client";

import Loader from "components/Generals/Loader";
import Side from "components/Userprofile/Side";
import { useNotificationContext } from "context/notificationContext";
import { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, TreeSelect } from "antd";
import base from "lib/base";
import { createPartner } from "lib/actionFetch"; // CREATE API энд
import { getMemberCategories, getPartners } from "lib/getFetchers";
import { Editor } from "@tinymce/tinymce-react";
import TextArea from "antd/es/input/TextArea";
import axios from "axios-base";
import { useRouter } from "next/navigation";
import { convertFromdata } from "lib/check";
import Spinner from "components/Generals/Spinner";
import LinksModal from "components/Userprofile/LinksModal";
import UploadImage from "components/Userprofile/UploadImage";
import MapPickerModal from "components/Generals/MapPickerModal";

export default function AddPartnerPage() {
  const { contentLoad, setError, setAlert } = useNotificationContext();
  const [partners, setPartners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState();
  const [links, setLinks] = useState([]);
  const [isLinksModalOpen, setIsLinksModalOpen] = useState(false);
  const [logo, setLogo] = useState(null);
  const [cover, setCover] = useState(null);

  const router = useRouter();
  const [form] = Form.useForm();

  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [latLng, setLatLng] = useState({ lat: null, lng: null });

  const handleChange = (event) => {
    form.setFieldsValue({ about: event });
  };

  const handleCreate = async (values) => {
    const data = {
      ...values,
      links: links,
      logo: logo?.name, // backend талдаа зөвхөн нэрийг дамжуулна
      cover: cover?.name,
    };
    if (!data.category?.length) data.category = [];

    if (latLng.lat && latLng.lng) {
      data.location = {
        type: "Point",
        coordinates: [latLng.lng, latLng.lat],
      };
    }
    const sendData = convertFromdata(data);
    setLoading(true);
    try {
      const res = await createPartner(sendData);
      if (res?.data?.data) {
        setAlert("Амжилттай хадгаллаа");
        router.push("/profile/company");
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchDatas = async () => {
      const { partners } = await getPartners(`status=true`);
      const { categories } = await getMemberCategories(``);
      setCategories(categories);
      let data = [{ value: null, label: "Харьяалалгүй" }];
      const pdata = partners.map((el) => ({
        value: el._id,
        label: el.name,
      }));
      setPartners(data.concat(pdata));
    };
    fetchDatas().catch(console.error);
  }, []);

  if (contentLoad) {
    return (
      <section className="profile-section">
        <div className="container">
          <div className="row">
            <Loader />
          </div>
        </div>
      </section>
    );
  }

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
                    <h4>Шинэ компани нэмэх</h4>
                  </div>
                  <div className="user-form-control">
                    <Form name="basic" layout="vertical" form={form}>
                      <div className="row">
                        <div className="col-lg-12">
                          <Form.Item
                            name="name"
                            label="Компаний нэр"
                            rules={[
                              { required: true, message: "Нэр оруулна уу!" },
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
                              { required: true, message: "Салбар сонгоно уу!" },
                            ]}
                          >
                            <TreeSelect
                              showSearch
                              style={{ width: "100%" }}
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
                          <Form.Item label="Лого">
                            <UploadImage value={logo} onChange={setLogo} />
                          </Form.Item>
                        </div>

                        <div className="col-lg-6">
                          <Form.Item label="Cover зураг">
                            <UploadImage value={cover} onChange={setCover} />
                          </Form.Item>
                        </div>

                        <div className="col-lg-6">
                          <Form.Item
                            name="email"
                            label="Имэйл хаяг"
                            hasFeedback
                            rules={[
                              { required: true, message: "Имэйл оруулна уу" },
                              { type: "email", message: "Имэйл буруу байна!" },
                            ]}
                          >
                            <Input placeholder="Имэйл" />
                          </Form.Item>
                        </div>

                        <div className="col-lg-6">
                          <Form.Item
                            label="Утасны дугаар"
                            name="phoneNumber"
                            rules={[
                              { required: true, message: "Утас оруулна уу!" },
                            ]}
                            hasFeedback
                          >
                            <InputNumber
                              placeholder="Утас"
                              style={{ width: "100%" }}
                            />
                          </Form.Item>
                        </div>

                        <div className="col-lg-6">
                          <Form.Item label="Газрын байршил">
                            <div style={{ display: "flex", gap: "8px" }}>
                              <Input
                                placeholder="lng"
                                value={latLng.lng}
                                onChange={(e) =>
                                  setLatLng({
                                    ...latLng,
                                    lng: parseFloat(e.target.value),
                                  })
                                }
                              />
                              <Input
                                placeholder="lat"
                                value={latLng.lat}
                                onChange={(e) =>
                                  setLatLng({
                                    ...latLng,
                                    lat: parseFloat(e.target.value),
                                  })
                                }
                              />
                              <Button onClick={() => setIsMapModalOpen(true)}>
                                Газраа сонгох
                              </Button>
                            </div>
                          </Form.Item>
                        </div>

                        <div className="col-lg-12">
                          <Form.Item label="Холбоо барих линкүүд">
                            <div style={{ marginBottom: 8 }}>
                              <Button onClick={() => setIsLinksModalOpen(true)}>
                                Холбоос нэмэх
                              </Button>
                            </div>

                            <ul>
                              {links.map((link, idx) => (
                                <li key={idx}>
                                  {link.name} - {link.url}
                                  <Button
                                    type="link"
                                    danger
                                    size="small"
                                    onClick={() => {
                                      setLinks(
                                        links.filter((_, i) => i !== idx)
                                      );
                                    }}
                                  >
                                    Устгах
                                  </Button>
                                </li>
                              ))}
                            </ul>
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
                                message: "Дэлгэрэнгүй оруулна уу",
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
                            />
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
                          .then(handleCreate)
                          .catch(console.error);
                      }}
                    >
                      Хадгалах
                    </Button>

                    <Button
                      key="back"
                      htmlType="button"
                      onClick={() => router.back()}
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
      <LinksModal
        open={isLinksModalOpen}
        onCancel={() => setIsLinksModalOpen(false)}
        onAdd={(link) => {
          setLinks([...links, link]);
          setIsLinksModalOpen(false);
        }}
      />
      <MapPickerModal
        open={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        latLng={latLng}
        setLatLng={setLatLng}
      />
    </>
  );
}
