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

const PartnerDetails = ({ data, members, coursies }) => {
  const contactRender = (link) => {
    let icon = <FontAwesomeIcon icon={faLink} />;

    switch (link.name.toLowerCase()) {
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
      <div className="partner-details-head card-box">
        <div className="partner-cover ">
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
            {data.links &&
              JSON.parse(data.links).map((link) => (
                <>
                  <a
                    href={
                      link.name.toLowerCase() === "phone"
                        ? "callto:" + link.link
                        : link.name.toLowerCase() === "email"
                        ? "mailto:" + link.link
                        : link.link
                    }
                    target="_blank"
                    className="member-contact-item"
                  >
                    {contactRender(link)}
                  </a>
                </>
              ))}
            <div
              className="member-contact-item qr-code-modal-btn"
              onClick={handleCancel}
            >
              <FontAwesomeIcon icon={faQrcode} />
            </div>
          </div>
        </div>
      </div>
      <div className="partner-details">
        <div className="translate-google">
          <div id="google_translate_element"></div>
        </div>
      </div>

      <Tabs defaultActiveKey="details" className="profile_tabs">
        <TabPane tab="Дэлгэрэнгүй" key="details">
          <div className="card-box">
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
          </div>
          <h4 className="sub-title-box"> Хамт олон </h4>
          <div className="row member-company-list">
            {members &&
              members.length > 0 &&
              members.map((el, index) => (
                <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={el._id}>
                  <Member data={el} />
                </div>
              ))}
          </div>
        </TabPane>
        <TabPane tab="Сургалт" key="courses">
          <div className="card-box">
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
          </div>
        </TabPane>
        <TabPane tab="Үнэлгээ" key="rate">
          <div className="card-box"></div>
        </TabPane>
      </Tabs>

      <Modal
        title={"QR код"}
        visible={qrModal}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={() => handleCancel()}>
            Буцах
          </Button>,
        ]}
      >
        <div className="modal-body modal-qr-body">
          {" "}
          <QRCode
            size={100}
            style={{
              height: "auto",
              maxWidth: "100%",
              width: "220",
            }}
            value={`${base.baseUrl}/${data._id}`}
            viewBox={`0 0 256 256`}
          />
        </div>
      </Modal>
    </>
  );
};

export default PartnerDetails;
