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
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import QRCode from "react-qr-code";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import base from "lib/base";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import RateColMember from "./RateColMember";

const PartnerDetails = ({ data, members }) => {
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
  return (
    <>
      <div className="row">
        <div className="col-lg-3">
          <div className="member-profile-side">
            <div className="profile-logo-box">
              {data.logo && (
                <img
                  className="profile-logo-img"
                  src={`${base.cdnUrl}/450/${data.logo}`}
                />
              )}
            </div>
            <div className="profile-info">
              <h6> {data.name} </h6>
            </div>
          </div>

          <div className="member-profile-side">
            <div className="member-side-head">
              <h6> Холбоо барих </h6>
            </div>
            <div className="member-contact">
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
            </div>
          </div>
        </div>
        <div className="col-lg-9">
          <div className="profile-details">
            <div className="profile-head">
              <h6> Байгууллагын тухай</h6>
            </div>
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
        </div>
        <div className="member-col-list">
          {members &&
            members.length > 0 &&
            members.map((el, index) => <RateColMember data={el} />)}
        </div>
      </div>
    </>
  );
};

export default PartnerDetails;
