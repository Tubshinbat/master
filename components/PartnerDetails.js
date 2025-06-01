import {
  faSkype,
  faTwitch,
  faYoutube,
  faFacebook,
  faInstagram,
  faLinkedin,
  faFacebookF,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faLink,
  faPhoneAlt,
  faQrcode,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import QRCode from "react-qr-code";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import base from "lib/base";
import RateColMember from "./RateColMember";
import { useState } from "react";
import { Button, Modal, Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import Member from "./Member";
import Teacher from "./Teacher";
import StarRating from "./Members/Star";
import { Mail, PhoneCall } from "lucide-react";
import MemberItem from "./Members/MemberItem";

const PartnerDetails = ({ data, members, coursies }) => {
  const contactRender = (link) => {
    let icon = <FontAwesomeIcon icon={faLink} />;

    switch (link?.name?.toLowerCase()) {
      case "facebook": {
        icon = <FontAwesomeIcon icon={faFacebookF} />;
        break;
      }
      case "twitter": {
        icon = <FontAwesomeIcon icon={faTwitter} />;
        break;
      }
      case "linkedin":
        icon = <FontAwesomeIcon icon={faLinkedin} />;
        break;
      case "youtube":
        icon = <FontAwesomeIcon icon={faYoutube} />;
        break;
      case "twitch":
        icon = <FontAwesomeIcon icon={faTwitch} />;
        break;
      case "instagram":
        icon = <FontAwesomeIcon icon={faInstagram} />;
        break;
      case "skype":
        <FontAwesomeIcon icon={faSkype} />;
        break;
      case "phone":
        <FontAwesomeIcon icon={faPhoneAlt} />;
        break;
      case "email":
        icon = <FontAwesomeIcon icon={faEnvelope} />;
        break;
      default:
        icon = <FontAwesomeIcon icon={faLink} />;
        break;
    }
    return icon;
  };

  const [qrModal, setQrModal] = useState(false);

  const handleCancel = () => {
    setQrModal((prev) => !prev);
  };

  return (
    <>
      <div className="partner-header">
        <div className="partner-cover">
          {data.cover ? (
            <img
              className="partner-cover-img"
              src={`${base.cdnUrl}/${data.cover}`}
            />
          ) : (
            <img className="partner-cover-img" src="/images/cover-bg.jpg" />
          )}
        </div>
        <div className="partner-profile">
          <div className="partner-profile-details">
            <div className="partner-logo-box">
              {data.logo && <img src={`${base.cdnUrl}/450/${data.logo}`} />}
            </div>
            <div className="partner-info">
              <h6> {data.name} </h6>
              <div className="static_count">
                <span> {members.length} хүний бүрэлдхүүнтэй </span>
              </div>
              <div className="static_count">
                <span> {coursies.length} сургалт </span>
              </div>
            </div>
          </div>
          <div className="member-contact head-contact">
            <div className="profile-rating">
              <div className="profile-star">
                <label>Нийт үнэлгээ</label>
                <StarRating
                  value={data?.rating * 20}
                  ratingCount={data?.ratingCount}
                />
              </div>
              <div className="qr__box">
                <QRCode
                  size={80}
                  style={{
                    height: "auto",
                    maxWidth: "100%",
                    width: "100%",
                  }}
                  value={`${base.baseUrl}/partner-rating/${data._id}`}
                  viewBox={`0 0 80 80`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="profile-content">
        <div className="row">
          <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <Tabs defaultActiveKey="details" className="profile_tabs">
              <TabPane tab="Дэлгэрэнгүй" key="details">
                <div
                  className="profile-detail"
                  dangerouslySetInnerHTML={{
                    __html: data.about,
                  }}
                ></div>
                <div className="profile-categories">
                  {data.category &&
                    data.category.map((cat) => (
                      <div className="category-item"> {cat.name} </div>
                    ))}
                </div>

                <h4 className="sub-title-box mt-4 mb-2"> Хамт олон </h4>
                <div className="row member-company-list g-4">
                  {members &&
                    members.length > 0 &&
                    members.map((el, index) => (
                      <div
                        className="col-lg-3 col-md-4 col-sm-6 col-12"
                        key={el._id}
                      >
                        <MemberItem data={el} />
                      </div>
                    ))}
                </div>
              </TabPane>
              <TabPane tab="Сургалт" key="courses">
                {coursies &&
                  coursies.map((el) => (
                    <div className="course-item" key={el._id}>
                      <div className="course-info">
                        <div className="course-img">
                          <img src={`${base.cdnUrl}/450/${el.picture}`} />
                        </div>
                        <div className="course-info-details">
                          <div className="course-title">
                            <span> Сургалтын нэр </span>
                            <p>{el.name}</p>
                          </div>
                          <div className="course-info-item">
                            {el.students.length} төгсөгчид{" "}
                          </div>
                        </div>
                      </div>
                      <div className="course-teachers">
                        <h4>Багш нар</h4>
                        <div className="row member-teacher-list">
                          {el.teachers &&
                            el.teachers.map((teacher, index) => (
                              <div
                                className="col-lg-3 col-md-3 col-sm-6 col-12"
                                key={teacher._id + index}
                              >
                                <Teacher data={teacher} />
                              </div>
                            ))}
                        </div>
                      </div>{" "}
                      <div className="course-teachers">
                        <h4>Шавь нар</h4>
                        <div className="row ">
                          {el.students &&
                            el.students.map((students, index) => (
                              <div
                                className="col-lg-2 col-md-3 col-sm-6 col-12"
                                key={students._id + index}
                              >
                                <Teacher data={students} />
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  ))}
              </TabPane>
              <TabPane tab="Үнэлгээ" key="rate"></TabPane>
            </Tabs>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
            <div className="profile-sidebar mt-5">
              <div className="profile-side">
                <div className="profile-side-head">
                  <h6> Холбоо барих </h6>
                </div>
                <div className="profile-side-body">
                  <div className="member-contact">
                    <div className="member-contact-item">
                      <a href={`tel:${data?.phoneNumber}`}>
                        <PhoneCall />
                        {data?.phoneNumber}
                      </a>
                    </div>
                    <div className="member-contact-item">
                      <a href={`mailto:${data?.email}`}>
                        <Mail />
                        {data?.email}
                      </a>
                    </div>

                    <div className="contact-links">
                      {data.links &&
                        data.links.map((link) => (
                          <a
                            href={
                              link?.name?.toLowerCase() === "phone"
                                ? "callto:" + link.url
                                : link?.name?.toLowerCase() === "email"
                                ? "mailto:" + link?.url
                                : link?.url
                            }
                            target="_blank"
                            className="member-contact-item"
                            key={link?.url}
                          >
                            {contactRender(link)}
                          </a>
                        ))}
                    </div>
                  </div>
                </div>
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PartnerDetails;
