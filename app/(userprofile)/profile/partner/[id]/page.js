"use client";

import Loader from "components/Generals/Loader";
import Side from "components/Userprofile/Side";
import { useNotificationContext } from "context/notificationContext";
import { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, TreeSelect } from "antd";
import base from "lib/base";
import { getMemberCategories, getPartner, getPartners } from "lib/getFetchers";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios-base";
import { useRouter } from "next/navigation";
import Spinner from "components/Generals/Spinner";
import LinksModal from "components/Userprofile/LinksModal";
import UploadImage from "components/Userprofile/UploadImage";
import MapPickerModal from "components/Generals/MapPickerModal";
import { updatePartner } from "lib/actionFetch";

export default function AddPartnerPage({ params }) {
  const { id } = params;
  const { contentLoad, setError, setAlert } = useNotificationContext();
  const [partners, setPartners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [links, setLinks] = useState([]);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isLinksModalOpen, setIsLinksModalOpen] = useState(false);
  const [logo, setLogo] = useState(null);
  const [cover, setCover] = useState(null);
  const [members, setMembers] = useState([]);
  const [form] = Form.useForm();
  const router = useRouter();

  const fetchMembers = async (search = "") => {
    try {
      const res = await axios.get(
        `${base.apiUrl}/members?status=true&name=${search}`
      );
      const data = res.data.data.map((m) => ({ label: m.name, value: m._id }));
      setMembers((prev) => {
        const existingIds = prev.map((p) => p.value);
        const newOnes = data.filter((d) => !existingIds.includes(d.value));
        return [...prev, ...newOnes];
      });
    } catch (err) {
      setError(err);
    }
  };

  const fetchInitial = async () => {
    const { partners } = await getPartners("status=true");
    const { categories } = await getMemberCategories();
    setCategories(categories);
    setPartners([
      { value: null, label: "Харьяалалгүй" },
      ...partners.map((p) => ({ value: p._id, label: p.name })),
    ]);
  };

  const fetchPartner = async () => {
    setLoading(true);
    try {
      const { partner } = await getPartner(id);

      if (partner) {
        // populate хийгдсэн тул name ирж байгаа
        const selectedMembers = [
          ...(partner.admins || []),
          ...(partner.employees || []),
          ...(partner.teachers || []),
        ].map((m) => ({ value: m._id, label: m.name }));

        // members дээр merge хийх (шинэ нэмэх)
        const existingIds = members.map((m) => m.value);
        const newMembers = selectedMembers.filter(
          (m) => !existingIds.includes(m.value)
        );

        if (newMembers.length > 0) {
          setMembers((prev) => [...prev, ...newMembers]);
        }

        form.setFieldsValue({
          ...partner,
          category: partner.category.map((cat) => cat._id),
          admins: partner.admins.map((m) => m._id),
          employees: partner.employees.map((m) => m._id),
          teachers: partner.teachers.map((m) => m._id),
          lat: partner.location?.coordinates[1],
          lng: partner.location?.coordinates[0],
        });

        setLinks(partner.links || []);

        if (partner.logo)
          setLogo({
            name: partner.logo,
            url: `${base.cdnUrl}/${partner.logo}`,
          });

        if (partner.cover)
          setCover({
            name: partner.cover,
            url: `${base.cdnUrl}/${partner.cover}`,
          });
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    const data = { ...values, links, logo: logo?.name, cover: cover?.name };

    if (values.lat && values.lng) {
      data.location = {
        type: "Point",
        coordinates: [parseFloat(values.lng), parseFloat(values.lat)],
      };
    }
    delete data.lat;
    delete data.lng;

    const sendData = new FormData();
    Object.keys(data).forEach((key) => {
      const value = data[key];
      if (value === undefined || value === null || value === "") return;
      if (Array.isArray(value) || typeof value === "object") {
        sendData.append(key, JSON.stringify(value));
      } else {
        sendData.append(key, value);
      }
    });

    setLoading(true);
    try {
      await updatePartner(id, sendData);
      setAlert("Амжилттай шинэчлэгдлээ");
      router.push("/profile/company");
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitial().catch(console.error);
    fetchMembers().catch(console.error);
  }, []);

  useEffect(() => {
    if (id) fetchPartner();
  }, [id]);

  if (contentLoad)
    return (
      <section className="profile-section">
        <div className="container">
          <div className="row">
            <Loader />
          </div>
        </div>
      </section>
    );

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
                    <h4>{id ? "Компани засах" : "Шинэ компани нэмэх"}</h4>
                  </div>
                  <div className="user-form-control">
                    <Form form={form} layout="vertical">
                      <div className="row">
                        <div className="col-lg-12">
                          <Form.Item
                            name="name"
                            label="Компаний нэр"
                            rules={[{ required: true }]}
                          >
                            <Input placeholder="Нэр" />
                          </Form.Item>
                        </div>

                        <div className="col-lg-12">
                          <Form.Item
                            name="category"
                            label="Салбар"
                            rules={[{ required: true }]}
                          >
                            <TreeSelect
                              showSearch
                              style={{ width: "100%" }}
                              dropdownStyle={{
                                maxHeight: 400,
                                overflow: "auto",
                              }}
                              placeholder="Сонгоно уу"
                              allowClear
                              multiple
                              treeNodeFilterProp="title"
                              treeDefaultExpandAll
                              treeData={categories}
                            />
                          </Form.Item>
                        </div>
                        <div className="col-lg-12">
                          <Form.Item name="admins" label="Үүсгэн байгуулагчид">
                            <TreeSelect
                              multiple
                              allowClear
                              style={{ width: "100%" }}
                              onSearch={(value) => fetchMembers(value)}
                              treeData={members}
                              placeholder="Үүсгэн байгуулагчид сонгоно уу"
                            />
                          </Form.Item>
                        </div>

                        <div className="col-lg-12">
                          <Form.Item name="employees" label="Ажилчид">
                            <TreeSelect
                              multiple
                              allowClear
                              style={{ width: "100%" }}
                              onSearch={(value) => fetchMembers(value)}
                              treeData={members}
                              placeholder="Ажилчид сонгоно уу"
                            />
                          </Form.Item>
                        </div>

                        <div className="col-lg-12">
                          <Form.Item name="teachers" label="Багш нар">
                            <TreeSelect
                              multiple
                              allowClear
                              style={{ width: "100%" }}
                              onSearch={(value) => fetchMembers(value)}
                              treeData={members}
                              placeholder="Багш нар сонгоно уу"
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
                            rules={[{ required: true, type: "email" }]}
                          >
                            <Input placeholder="Имэйл" />
                          </Form.Item>
                        </div>

                        <div className="col-lg-6">
                          <Form.Item
                            name="phoneNumber"
                            label="Утас"
                            rules={[{ required: true }]}
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
                              <Form.Item name="lng" noStyle>
                                <Input placeholder="lng" />
                              </Form.Item>
                              <Form.Item name="lat" noStyle>
                                <Input placeholder="lat" />
                              </Form.Item>
                              <Button onClick={() => setIsMapModalOpen(true)}>
                                Газраа сонгох
                              </Button>
                            </div>
                          </Form.Item>
                        </div>

                        <div className="col-lg-12">
                          <Form.Item label="Холбоо барих линкүүд">
                            <Button onClick={() => setIsLinksModalOpen(true)}>
                              Холбоос нэмэх
                            </Button>
                            <ul>
                              {links.map((link, idx) => (
                                <li key={idx}>
                                  {link.name} - {link.url}
                                  <Button
                                    type="link"
                                    danger
                                    size="small"
                                    onClick={() =>
                                      setLinks(
                                        links.filter((_, i) => i !== idx)
                                      )
                                    }
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
                            name="about"
                            label="Дэлгэрэнгүй танилцуулга"
                            rules={[{ required: true }]}
                            getValueFromEvent={(e) =>
                              e.target && e.target.getContent()
                            }
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
                      type="primary"
                      onClick={() =>
                        form
                          .validateFields()
                          .then(handleSubmit)
                          .catch(console.error)
                      }
                    >
                      Хадгалах
                    </Button>
                    <Button onClick={() => router.back()}>Буцах</Button>
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
        latLng={form.getFieldsValue(["lat", "lng"])}
        setLatLng={({ lat, lng }) => form.setFieldsValue({ lat, lng })}
      />
    </>
  );
}
