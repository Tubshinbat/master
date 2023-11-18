"use client";
import axios from "axios-base";
import base from "lib/base";
import Side from "components/Userprofile/Side";
import { useAuthContext } from "context/authContext";
import { useNotificationContext } from "context/notificationContext";
import moment from "moment";

import {
  Button,
  Modal,
  Input,
  Table,
  Space,
  Tooltip,
  Form,
  InputNumber,
  Upload,
} from "antd";

import { SearchOutlined } from "@ant-design/icons";
import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { InboxOutlined } from "@ant-design/icons";
import { getReward } from "lib/getFetchers";

export default function RootLayout({ children }) {
  const { user } = useAuthContext();
  const { setAlert, setError } = useNotificationContext();
  const [form] = Form.useForm();
  const { Dragger } = Upload;
  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [selectData, setSelectData] = useState(null);
  const [progress, setProgress] = useState(0);
  const [searchedColumn, setSearchedColumn] = useState("");
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  // -- FILTER STATE
  const [querys, setQuerys] = useState({});
  const [filterdColumns, setFilterdColumns] = useState([]);
  // -- TABLE STATE
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
    },
  });

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Хайлт хийх`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Хайх
          </Button>
          <Button
            onClick={() => handleReset(clearFilters, selectedKeys, dataIndex)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Шинэчлэх
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const [columns, setColumns] = useState([
    {
      dataIndex: "name",
      key: "name",
      title: "Авсан шагнал",
      status: true,
      ...getColumnSearchProps("name"),
      sorter: (a, b) => handleSort(),
    },

    {
      dataIndex: "pictures",
      key: "pictures",
      title: "Зураг",
      status: true,
      render: (text, record) => {
        return (
          <div className="table-image">
            {record.pictures && record.pictures[0] ? (
              <img src={`${base.cdnUrl}/150x150/${record.pictures[0]}`} />
            ) : (
              "Зураггүй"
            )}
          </div>
        );
      },
    },
    {
      dataIndex: "date",
      key: "date",
      title: "Оролцсон огноо",
      status: true,
      ...getColumnSearchProps("date"),
      sorter: (a, b) => handleSort(),
    },

    {
      key: "actions",
      title: "Үйлдэлүүд",
      status: true,
      render: (text, record) => {
        return (
          <div className="action-btns">
            <Tooltip title="Засах">
              <button
                className="action-btn-edit"
                onClick={() => {
                  showEdit(record.key);
                  setVisible((sb) => ({ ...sb, title: "Шинэчлэх" }));
                }}
              >
                <FontAwesomeIcon icon={faPencil} />
              </button>
            </Tooltip>
            <Tooltip title="Устгах">
              <button
                className="action-btn-delete"
                onClick={async () => {
                  showModal("delete");
                  const { reward } = await getReward(record.key);
                  if (reward) {
                    setSelectData(reward);
                  }
                  setEditId(record.key);
                  setVisible((bs) => ({ ...bs, title: "Өгөгдөл устгах" }));
                }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </Tooltip>
          </div>
        );
      },
    },
  ]);

  // QUERY CHANGES AND FEATCH DATA
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const query = queryBuild();
      const partics = await axios.get(`rewards?${query}`);
      partics && partics.data && appendData(partics.data.data);
      if (partics.data && partics.data.pagination) {
        const total = partics.data.pagination.total;
        const pageSize = partics.data.pagination.limit;

        setTableParams((tbf) => ({
          ...tbf,
          pagination: { ...tbf.pagination, total, pageSize },
        }));
      }
      setLoading(false);
    };

    if (querys) {
      fetchData().catch((error) => console.log(error));
    }
  }, [querys]);

  useEffect(() => {
    const fetchData = async () => {
      await init();
    };

    fetchData().catch((error) => {});
  }, []);

  useEffect(() => {
    const select = [];
    select.push(filterdColumns.map((col) => col.dataIndex));
    setQuerys((bquery) => ({ ...bquery, select: select }));
  }, [filterdColumns]);

  // -- INIT
  const init = async () => {
    const query = queryBuild();
    setLoading(true);
    const partics = await axios.get(`/rewards?${query}`);
    if (partics.data && partics.data.data) appendData(partics.data.data);
    setLoading(false);
  };

  const appendData = (result) => {
    const refData = [];

    result.map((el) => {
      const key = el._id;

      el.createAt = moment(el.createAt)
        .utcOffset("+0800")
        .format("YYYY-MM-DD HH:mm:ss");
      el.updateAt = moment(el.updateAt)
        .utcOffset("+0800")
        .format("YYYY-MM-DD HH:mm:ss");

      refData.push({
        dataIndex: key,
        key,
        ...el,
      });
    });

    setData(() => [...refData]);
  };

  // -- HANDLE FUNCTIONS

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
    setQuerys((bquerys) => ({ ...bquerys, [dataIndex]: selectedKeys[0] }));
  };

  const handleReset = (clearFilters, selectedKeys, dataIndex) => {
    clearFilters();
    setQuerys((bquery) => ({ ...bquery, [dataIndex]: "" }));
    setSearchText("");
  };

  const handleSort = () => {};

  // -- MODAL STATE
  const [visible, setVisible] = useState({
    add: false,
    delete: false,
  });

  const showModal = (modal) => {
    setVisible((sb) => ({ ...sb, [modal]: true }));
  };

  const handleCancel = () => {
    setVisible((sb) => Object.keys(sb).map((el) => (sb[el] = false)));
    clear();
  };

  // -- TABLE SELECTED AND CHANGE

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    if (pagination) {
      setQuerys((bq) => ({
        ...bq,
        page: pagination.current,
        limit: pagination.pageSize,
      }));
    }

    if (sorter) {
      const clkey = sorter.columnKey;
      setQuerys((bquery) => ({
        ...bquery,
        sort: `${clkey + ":" + sorter.order}`,
      }));
    } else {
      setQuerys((bquery) => {
        delete bquery.sort;
        return { ...bquery };
      });
    }

    if (filters) {
      Object.keys(filters).map((key) => {
        let str = null;
        if (filters[key]) {
          str = filters[key].toString();
          setQuerys((bq) => ({ ...bq, [key]: str }));
        } else {
          setQuerys((bq) => {
            delete bq[key];
            return { ...bq };
          });
        }
      });
      //
    }
  };

  // Repeat functions
  const queryBuild = () => {
    let query = "";
    Object.keys(querys).map((key) => {
      key !== "select" && (query += `${key}=${querys[key]}&`);
    });

    return query;
  };

  const requiredRule = {
    required: true,
    message: "Тус талбарыг заавал бөглөнө үү",
  };

  const uploadImage = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;
    setLoading(true);
    const fmData = new FormData();
    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event) => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        setProgress(percent);
        if (percent === 100) {
          setTimeout(() => setProgress(0), 1000);
        }
        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
    };

    fmData.append("file", file);
    try {
      const res = await axios.post("/imgupload/memberupload", fmData, config);
      const img = {
        name: res.data.data,
        url: `${base.cdnUrl}/${res.data.data}`,
      };

      setPictures((bfPicture) => [...bfPicture, img]);
      setAlert(res.data.data + " Хуулагдлаа");
      setLoading(false);
      return img;
    } catch (err) {
      setError(err);
      setLoading(false);
      return false;
    }
  };

  const handleRemove = (file) => {
    let index;
    let deleteFile;
    let list;

    index = pictures.indexOf(file);
    deleteFile = pictures[index].name;
    list = pictures.slice();
    list.splice(index, 1);
    setPictures(list);

    if (isEdit == false)
      axios
        .delete("/imgupload", { data: { file: file.name } })
        .then((succ) => {
          setAlert("Амжилттай файл устгагдлаа");
        })
        .catch((error) => setError(error));
  };

  const uploadOptions = {
    onRemove: (file) => handleRemove(file),
    fileList: [...pictures],
    customRequest: (options) => uploadImage(options),
    accept: "image/*",
    name: "pictures",
    listType: "picture",
    multiple: true,
  };

  const handleAdd = async (values) => {
    setLoading(true);
    if (pictures.length > 0) values.pictures = pictures.map((el) => el.name);

    try {
      const data = {
        ...values,
        pkey: user._id,
      };

      await axios.post("/rewards", data);
      setAlert("Амжилттай нэмэгдлээ.");
      setLoading(false);
      await init();
      handleCancel();
    } catch (error) {
      setError(error);
      handleCancel();
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/rewards/${selectData._id}`);
      setAlert("Амжилттай устгагдлаа");
      await init();
      handleCancel();
    } catch (error) {
      setError(error);
    }
  };

  const handleEdit = async (values) => {
    setLoading(true);

    try {
      if (pictures.length > 0) values.pictures = pictures.map((el) => el.name);
      else values.pictures = [];

      const data = {
        id: editId,
        ...values,
        pkey: user._id,
      };

      await axios.put(`/rewards/${data.id}`, data);

      setAlert("Амжилттай хадгаллаа.");
      setLoading(false);
      await init();
      handleCancel();
    } catch (error) {
      setError(error);
      handleCancel();
    }
  };

  const clear = () => {
    form.resetFields();
    setLoading(false);
    setIsEdit(false);
    setPictures([]);
    setSelectData(null);
  };

  const showEdit = async (key) => {
    try {
      const { reward } = await getReward(key);
      if (reward) {
        form.setFieldsValue({ ...reward });
        if (reward.pictures && reward.pictures.length > 0) {
          setPictures(
            reward.pictures.map((img) => ({
              name: img,
              url: `${base.cdnUrl}/150x150/${img}`,
            }))
          );
        }
        setEditId(key);
        showModal("add");
        setIsEdit(true);
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
                  <div className="user-form-header">
                    <h4> Шагнал, урамшуулал </h4>
                  </div>
                  <div className="user-form-control">
                    <div className="user-form-btns">
                      <Button
                        className="add-btn"
                        onClick={() => showModal("add")}
                      >
                        <FontAwesomeIcon icon={faPlus} /> Нэмэх{" "}
                      </Button>
                    </div>
                    <div className="tableBox">
                      <Table
                        columns={columns}
                        // rowSelection={rowSelection}
                        dataSource={data}
                        onChange={handleTableChange}
                        pagination={tableParams.pagination}
                        loading={loading}
                        size="small"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Modal
        visible={visible && visible.delete}
        title={visible.title}
        onCancel={() => handleCancel()}
        footer={[
          <Button key="back" onClick={() => handleCancel()}>
            Болих
          </Button>,
          <Button
            key="submit"
            htmlType="submit"
            type="primary"
            loading={loading}
            onClick={() => handleDelete()}
            danger
          >
            Устгах
          </Button>,
        ]}
      >
        <p>{selectData && selectData.name} - ыг устгахдаа итгэлтэй байна уу?</p>
      </Modal>
      <Modal
        visible={visible && visible.add}
        title={visible.title}
        onCancel={() => handleCancel()}
        footer={[
          <Button key="back" onClick={() => handleCancel()}>
            Болих
          </Button>,
          <Button
            key="submit"
            htmlType="submit"
            type="primary"
            loading={loading}
            onClick={() => {
              form
                .validateFields()
                .then((values) => {
                  isEdit == false ? handleAdd(values) : handleEdit(values);
                })
                .catch((info) => {});
            }}
          >
            Хадгалах
          </Button>,
        ]}
      >
        <Form layout="vertical" autoComplete="false" form={form}>
          <div className="row">
            <div className="col-lg-12">
              <Form.Item
                label="Оролцсон тэмцээн, уралдаан"
                name="name"
                rules={[requiredRule]}
              >
                <Input placeholder="Оролцсон тэмцээн, уралдааны нэрийг оруулна уу" />
              </Form.Item>
            </div>

            <div className="col-lg-12">
              <Form.Item
                label="Оролцсон огноо"
                name="date"
                rules={[requiredRule]}
              >
                <InputNumber
                  placeholder="Оролцсон огноо оруулна уу"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </div>

            <div className="col-lg-12">
              <Dragger {...uploadOptions}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Зургаа энэ хэсэг рүү чирч оруулна уу
                </p>
                <p className="ant-upload-hint">
                  Нэг болон түүнээс дээш файл хуулах боломжтой
                </p>
              </Dragger>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
}
