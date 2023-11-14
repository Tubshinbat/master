"use client";

import Side from "components/Userprofile/Side";
import { useAuthContext } from "context/authContext";
import Spinner from "components/Generals/Spinner";
import {
  Button,
  Modal,
  Input,
  Select,
  Table,
  Tag,
  Space,
  Tooltip,
  Form,
  InputNumber,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import { SearchOutlined } from "@ant-design/icons";
import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function RootLayout({ children }) {
  const { user } = useAuthContext();
  const [form] = Form.useForm();
  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { Option } = Select;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

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
      dataIndex: "companyName",
      key: "companyName",
      title: "Компаний нэр",
      status: true,
      ...getColumnSearchProps("name"),
      sorter: (a, b) => handleSort(),
    },

    {
      dataIndex: "companyLogo",
      key: "companyLogo",
      title: "Лого",
      status: true,
      render: (text, record) => {
        return (
          <div className="table-image">
            {record.companyLogo ? (
              <img src={`${base.cdnUrl}150x150/${record.companyLogo}`} />
            ) : (
              "Лого оруулаагүй байна"
            )}
          </div>
        );
      },
    },
    {
      dataIndex: "position",
      key: "position",
      title: "Албан тушаал",
      status: true,
      ...getColumnSearchProps("position"),
      sorter: (a, b) => handleSort(),
    },

    {
      key: "actions",
      title: "Үйлдэлүүд",
      status: true,
      render: (text, record) => {
        return (
          <Button onClick={() => showModal("edit")}>
            {" "}
            <FontAwesomeIcon icon={faPencil} />
          </Button>
        );
      },
    },
  ]);

  // QUERY CHANGES AND FEATCH DATA
  useEffect(() => {
    if (querys) {
      const query = queryBuild();
      // props.loadPage(query);
    }
  }, [querys]);

  useEffect(() => {
    const select = [];
    select.push(filterdColumns.map((col) => col.dataIndex));
    setQuerys((bquery) => ({ ...bquery, select: select }));
  }, [filterdColumns]);

  // useEffect(() => {
  //   const total = props.pagination.total;
  //   const pageSize = props.pagination.limit;

  //   setTableParams((tbf) => ({
  //     ...tbf,
  //     pagination: { ...tbf.pagination, total, pageSize },
  //   }));
  // }, [props.pagination]);

  // -- INIT
  const init = () => {
    const query = queryBuild();
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
    // clear();
  };

  // -- TABLE SELECTED AND CHANGE

  const handleColumn = (e) => {
    const newArr = [...cloneColumns];
    const checkElmt = newArr.findIndex((col) => col.key == e.target.name);
    const toggle = newArr[checkElmt].status === true ? false : true;
    newArr[checkElmt] = { ...newArr[checkElmt], status: toggle };
    const json_str = JSON.stringify(newArr);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    if (pagination) {
      setQuerys((bq) => ({
        ...bq,
        pageNumber: pagination.current,
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
    if (querys.select && querys.select[0])
      query += `select=${
        querys &&
        querys.select &&
        querys.select[0].join(" ").replaceAll(",", " ")
      }`;
    return query;
  };

  const requiredRule = {
    required: true,
    message: "Тус талбарыг заавал бөглөнө үү",
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
                    <h4> Ажлын туршилга </h4>
                  </div>
                  <div className="user-form-control">
                    <div className="user-form-btns">
                      <Button onClick={() => showModal("add")}>
                        <FontAwesomeIcon icon={faPlus} /> Нэмэх{" "}
                      </Button>
                    </div>
                    <div className="tableBox">
                      <Table
                        columns={columns}
                        // rowSelection={rowSelection}
                        // dataSource={data}
                        onChange={handleTableChange}
                        // pagination={tableParams.pagination}
                        // loading={props.loading}
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
        visible={visible && visible.add}
        title="Туршилга нэмэх"
        onCancel={() => handleCancel()}
        footer={[
          <Button key="back" onClick={() => handleCancel()}>
            Буцах
          </Button>,
          <Button
            key="submit"
            htmlType="submit"
            type="primary"
            // loading={loading.visible}
            onClick={() => {
              form
                .validateFields()
                .then((values) => {})
                .catch((info) => {
                  // console.log(info);
                });
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
                label="Компаний нэр"
                name="companyName"
                rules={[requiredRule]}
              >
                <Input placeholder="Компаний нэр оруулна уу" />
              </Form.Item>
            </div>
            <div className="col-lg-12">
              <Form.Item
                label="Компаний товч танилцуулга"
                name="about"
                rules={[requiredRule]}
              >
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
                label="Албан тушаал"
                name="position"
                rules={[requiredRule]}
              >
                <Input placeholder="Албан тушаалаа оруулна уу" />
              </Form.Item>
            </div>
            <div className="col-lg-12">
              <Form.Item
                label="Ажилд орсон огноо"
                name="startDate"
                rules={[requiredRule]}
                style={{ width: "100%" }}
              >
                <InputNumber placeholder="Ажилд орсон огноо оруулна уу" />
              </Form.Item>
            </div>
            <div className="col-lg-12">
              <Form.Item
                label="Ажлаас гарсан огноо"
                name="endDate"
                rules={[requiredRule]}
              >
                <Input placeholder="Ажлаас гарсан огноо оруулна уу" />
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
}
