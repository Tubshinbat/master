"use client";
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
import { Wrapper } from "@googlemaps/react-wrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import base from "lib/base";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const MemberDetials = ({ data, alternativeMembers }) => {
  const AnyReactComponent = ({ text }) => <div>{text}</div>;
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
            <div className="profile-picture-box">
              {data.picture && (
                <Image
                  className="profile-img"
                  width="0"
                  height="0"
                  sizes="100vw"
                  quality="100"
                  src={`${base.cdnUrl}/350x350/${data.picture}`}
                />
              )}
            </div>
            <div className="profile-info">
              <h6> {data.name} </h6>
              <span>{data.position}</span>
            </div>
            <div className="profile-rating">
              <div className="member-rate">
                <span> Зэрэглэл </span>
                <div className="star-rating">
                  <input
                    id={`star-5-${data._id}`}
                    type="radio"
                    name={`rating-${data._id}`}
                    defaultValue={`star-5-${data._id}`}
                    checked={data.rating === 5}
                  />
                  <label htmlFor={`star-5-${data._id}`} title="5 stars">
                    <FontAwesomeIcon
                      className="active"
                      icon={faStar}
                      aria-hidden="true"
                    />
                  </label>
                  <input
                    id={`star-4-${data._id}`}
                    type="radio"
                    name={`rating-${data._id}`}
                    defaultValue={`star-4-${data._id}`}
                    checked={data.rating === 4}
                  />
                  <label htmlFor={`star-4-${data._id}`} title="4 stars">
                    <FontAwesomeIcon
                      className="active"
                      icon={faStar}
                      aria-hidden="true"
                    />
                  </label>
                  <input
                    id={`star-3-${data._id}`}
                    type="radio"
                    name={`rating-${data._id}`}
                    defaultValue={`star-3-${data._id}`}
                    checked={data.rating === 3}
                  />
                  <label htmlFor={`star-3-${data._id}`} title="3 stars">
                    <FontAwesomeIcon
                      className="active"
                      icon={faStar}
                      aria-hidden="true"
                    />
                  </label>
                  <input
                    id={`star-2-${data._id}`}
                    type="radio"
                    name={`rating-${data._id}`}
                    defaultValue={`star-2-${data._id}`}
                    checked={data.rating === 2}
                  />
                  <label htmlFor={`star-2-${data._id}`} title="2 stars">
                    <FontAwesomeIcon
                      className="active"
                      icon={faStar}
                      aria-hidden="true"
                    />
                  </label>
                  <input
                    id={`star-1-${data._id}`}
                    type="radio"
                    name={`rating-${data._id}`}
                    defaultValue={`star-1-${data._id}`}
                    checked={data.rating === 1}
                  />
                  <label htmlFor={`star-1-${data._id}`} title="1 star">
                    <FontAwesomeIcon
                      className="active"
                      icon={faStar}
                      aria-hidden="true"
                    />
                  </label>
                </div>
                <div className="member-count">
                  <span> Үнэлгээ өгсөн </span>
                  {data.ratingCount}
                </div>
              </div>
            </div>
          </div>
          <div className="member-profile-side">
            <div className="member-side-head">
              <h6> QR кодыг уншуулан үнэлгээ өгнө үү </h6>
              <div className="qr__box">
                <QRCode
                  size={256}
                  style={{
                    height: "auto",
                    maxWidth: "100%",
                    width: "100%",
                  }}
                  value={`${base.baseUrl}/rates/${data._id}`}
                  viewBox={`0 0 256 256`}
                />
              </div>
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
            {alternativeMembers && alternativeMembers.length > 0 && (
              <div className="member-side-head">
                <h6> Хамт ажиллагсад </h6>
              </div>
            )}
            <div className="alternative-members">
              {alternativeMembers &&
                alternativeMembers.map((member) => (
                  <div className="alternative-member">
                    <Link href={`/members/${member._id}`}>
                      <Image
                        className="alternative-img"
                        width="0"
                        height="0"
                        sizes="100vw"
                        quality="100"
                        src={`${base.cdnUrl}/150x150/${member.picture}`}
                      />
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="col-lg-9">
          <div className="profile-details">
            <div className="profile-head">
              <h6> Миний тухай</h6>
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
          {data.experience && (
            <div className="profile-details">
              <div className="profile-head">
                <h6> Туршилга </h6>
              </div>
              <div className="experience-list">
                {JSON.parse(data.experience).map((exp) => (
                  <div className="experience-item">
                    <h6>{exp.companyName}</h6>
                    <span>
                      {exp.date} - {exp.position}
                    </span>

                    <p>{exp.about}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="profile-details">
            <div className="profile-head">
              <h6> Хаяг </h6>
            </div>
            <div
              style={{
                height: "400px",
                width: "100%",
                padding: "10px",
                boxShadow: "0px 0px 15px rgb(0 0 0 / 8%)",
              }}
            >
              <Wrapper apiKey={"AIzaSyBVbaukknpuyvHnYSK_MmpI-5pcBwz83kw"}>
                <Map latitude={data.lat} longitude={data.long}></Map>
              </Wrapper>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Map = ({ latitude, longitude, children }) => {
  const ref = useRef(null);
  const [map, setMap] = useState(google.maps.Maps || null);

  useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new google.maps.Map(ref.current, {
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: true,
          center: {
            lat: latitude ?? 0,
            lng: longitude ?? 0,
          },
          zoom: 13,
        })
      );
    }
  }, [ref, map, latitude, longitude]);

  const marker = new google.maps.Marker({
    position: { lat: latitude, lng: longitude },
    map: map,
  });

  return (
    <>
      <div ref={ref} style={{ height: "100%", width: "100%" }} />
    </>
  );
};

export default MemberDetials;
