"use client";

import Loader from "components/Generals/Loader";
import Side from "components/Userprofile/Side";
import { useNotificationContext } from "context/notificationContext";
import { useEffect, useState } from "react";
import Spinner from "components/Generals/Spinner";
import { getUserCompanies } from "lib/getFetchers";
import { Badge, Button, Card, Col, Row, Tag } from "antd";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faStar } from "@fortawesome/free-solid-svg-icons";
import base from "lib/base";
import moment from "moment";
import { useCookies } from "react-cookie";
import Link from "next/link";

export default function CompanyListPage() {
  const [cookies] = useCookies(["nodetoken"]);
  const [data, setData] = useState([]);
  const { contentLoad, setError, setAlert } = useNotificationContext();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { companies } = await getUserCompanies("", cookies.nodetoken);
        console.log(companies);
        setData(companies || []);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
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
                  <h4>Миний компаниуд</h4>
                </div>
                <div className="user-form-control">
                  <div className="user-form-btns">
                    <Button
                      className="add-btn"
                      onClick={() => router.push("/profile/company/add")}
                    >
                      <FontAwesomeIcon icon={faPlus} /> Компани нэмэх
                    </Button>
                  </div>

                  <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
                    {data.map((item, idx) => (
                      <Col xs={24} sm={24} md={24} lg={24} key={idx}>
                        <Card bordered hoverable>
                          <Link
                            href={`/profile/partner/${item._id}`}
                            className="card-link"
                          >
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <img
                                src={`${base.cdnUrl}/${item.logo}`}
                                alt={item.name}
                                style={{
                                  width: 100,
                                  height: 100,
                                  borderRadius: 8,
                                  objectFit: "cover",
                                  marginRight: 20,
                                }}
                              />
                              <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 600, fontSize: 16 }}>
                                  {item.name}
                                </div>
                                <div style={{ color: "#999", fontSize: 12 }}>
                                  {moment(item.createAt).format("YYYY/MM/DD")} -
                                  бүртгүүлсэн
                                </div>

                                <div
                                  style={{
                                    marginTop: 8,
                                    display: "flex",
                                    gap: 8,
                                  }}
                                >
                                  <Tag color="red">
                                    <FontAwesomeIcon icon={faStar} /> Үнэлгээ{" "}
                                    {item.rating || 0}
                                  </Tag>
                                </div>
                              </div>

                              <div style={{ marginLeft: 10 }}>
                                {item.status ? (
                                  <Badge color="green" text="Идэвхтэй" />
                                ) : (
                                  <Badge color="red" text="Идэвхгүй" />
                                )}
                              </div>
                            </div>
                          </Link>
                        </Card>
                      </Col>
                    ))}
                  </Row>

                  {data.length === 0 && (
                    <div style={{ textAlign: "center", padding: 20 }}>
                      Компани бүртгэл алга байна.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
