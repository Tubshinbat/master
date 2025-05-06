"use client";
import {
  faFacebookF,
  faInstagram,
  faLinkedin,
  faSkype,
  faTwitch,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faLink,
  faPhoneAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu } from "antd";
import Image from "components/Generals/Image";
import ImageAvatar from "components/Generals/ImageAvatar";
import Loader from "components/Generals/Loader";
import NotFound from "components/Generals/Notfound";
import PageSide from "components/Generals/PageSide";
import MemberDetials from "components/MemberDetials";
import StarRating from "components/Members/Star";
import base from "lib/base";
import { getMember } from "lib/getFetchers";
import { ArrowLeft, Mail, PhoneCall } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import QRCode from "react-qr-code";

export default function Page({ params }) {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [alternativeMembers, setAlternativeMembers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState("about");

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

  const tabItems = [
    { key: "about", label: "Миний тухай" },
    { key: "awards", label: "Шагнал" },
    { key: "experience", label: "Ажлын туршлага" },
    { key: "ratings", label: "Үнэлгээ" },
  ];

  const handleTabChange = (e) => {
    setCurrentTab(e.key);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { member, alternativeMembers } = await getMember(params.id);
      setData(member);
      setAlternativeMembers(alternativeMembers);
      setLoading(false);
    };

    fetchData().catch((error) => console.log(error));
  }, []);

  if (!data && loading) {
    return (
      <section>
        <div className="container">
          <Loader />
        </div>
      </section>
    );
  }

  console.log(data);

  return (
    <>
      <Suspense fallback={<Loader />}>
        <div className="main">
          <div className="profile-header">
            <div className="container">
              <div className="member-profile">
                <div className="member-profile_details">
                  <div className="profile-picture">
                    <ImageAvatar
                      image={data.picture}
                      alt={data.name}
                      className="profile-img"
                    />
                  </div>
                  <div className="profile-info">
                    <h1 className="profile-name">{data.name}</h1>
                    <p className="profile-position">{data.position}</p>
                  </div>
                </div>
                <div className="profile-rating">
                  <div className="profile-star">
                    <label>Мэргэжилтний үнэлгээ</label>
                    <StarRating
                      value={data.rating * 20}
                      ratingCount={data.ratingCount}
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
                      value={`${base.baseUrl}/rates/${data._id}`}
                      viewBox={`0 0 80 80`}
                    />
                  </div>
                </div>
              </div>
              <div class="page-section__background"></div>
            </div>
          </div>
          <div className="profile-content">
            <div className="container">
              <div className="row">
                <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
                  <Menu
                    mode="horizontal"
                    selectedKeys={[currentTab]}
                    onClick={handleTabChange}
                    items={tabItems}
                  />
                  <div className="tab-content mt-4">
                    {currentTab === "about" && (
                      <div
                        className="about"
                        dangerouslySetInnerHTML={{ __html: data.about }}
                      ></div>
                    )}

                    {currentTab === "awards" && (
                      <div>
                        {/* Шагналуудыг data.about эсвэл тусдаа data.awards талбараас харуулж болно */}
                        <h4>Шагналууд:</h4>
                        <ul>
                          {(data.awards || []).map((award, index) => (
                            <li key={index}>{award}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {currentTab === "experience" && (
                      <div>
                        <h4>Ажлын туршлага:</h4>
                        <ul>
                          {JSON.parse(data.experience || "[]").map(
                            (exp, index) => (
                              <li key={index}>
                                <strong>{exp.companyName}</strong> —{" "}
                                {exp.position} ({exp.date})
                                <br />
                                <span>{exp.about}</span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}

                    {currentTab === "ratings" && (
                      <div>
                        <h4>Үнэлгээний түүх:</h4>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                  <div className="profile-sidebar">
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
                    </div>{" "}
                    <div className="profile-side">
                      <div className="member-side-head">
                        <h6> Хамт ажиллагсад </h6>
                      </div>
                      <div className="profile-side-body">
                        <div className="alternative-members">
                          {alternativeMembers &&
                            alternativeMembers.map((member) => (
                              <div className="alternative-member">
                                <Link href={`/members/${member._id}`}>
                                  <ImageAvatar
                                    className="alternative-img"
                                    image={`${member.picture}`}
                                    alt={member.name}
                                  />
                                </Link>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
}
