"use client";

import {
  faFacebookF,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import base from "lib/base";
import { getPartners } from "lib/getFetchers";
import { getWebInfo } from "lib/webinfo";
import { useEffect, useState } from "react";

const Footer = () => {
  const [partners, setPartners] = useState([]);
  const [info, setInfo] = useState({});
  const [phone, setPhone] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { partners } = await getPartners(`status=true&limit=5`);
      const { info } = await getWebInfo();
      if (info) {
        setPhone(info.phone.split(","));
        setInfo(info);
      }

      setPartners(partners);
    };
    fetchData().catch((error) => console.log(error));
  }, []);
  return (
    <>
      <footer>
        <div className="container">
          <div className="row">
            <div
              className="col-xl-6 col-lg-6 col-md-12"
              data-aos="fade-right"
              data-aos-duration={800}
            >
              <div className="footer-about">
                <img src={`${base.cdnUrl}/${info.whiteLogo}`} />
                <p>{info.siteInfo}</p>
              </div>
            </div>
            <div
              className="col-xl-3  col-lg-3 col-md-12"
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration={800}
            >
              <ul className="footer-menus">
                <li>
                  <a href={base.baseUrl}> Эхлэл </a>
                </li>
                <li>
                  <a href={base.baseUrl + "/services"}>Үйлчилгээнүүд</a>
                </li>
                <li>
                  <a href={base.baseUrl + "/news"}> Зөвлөгөө, мэдээлэл </a>
                </li>

                <li>
                  <a href={base.baseUrl + "/contact"}> Холбоо барих </a>
                </li>
              </ul>
            </div>
            <div
              className="col-xl-3  col-lg-3 col-md-12"
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration={800}
            >
              <div className={`footer-contact `}>
                <div className={`footer-phone `}>
                  {phone && phone[0] && (
                    <>
                      <FontAwesomeIcon icon={faPhone} className="footer-icon" />
                      <a href={`callto:${phone[0]}`}>
                        {phone[0].substring(0, 4) +
                          "-" +
                          phone[0].substring(4, 8)}{" "}
                      </a>
                    </>
                  )}
                </div>
                <div className={`footer-mail `}>
                  <FontAwesomeIcon icon={faEnvelope} className="footer-icon" />
                  <a href={`mailto:${info.email}`}> {info.email}</a>
                </div>
                <div className="footer-social-links">
                  <a href="https://www.facebook.com/">
                    <FontAwesomeIcon
                      icon={faFacebookF}
                      className="footer-social-link"
                    />
                  </a>
                  <a href="https://www.twitter.com/">
                    <FontAwesomeIcon
                      icon={faTwitter}
                      className="footer-social-link"
                    />
                  </a>
                  <a href="https://www.youtube.com/">
                    <FontAwesomeIcon
                      icon={faYoutube}
                      className="footer-social-link"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className={`footer-bar`}>
        <span
          className="wow animate__animated animate__fadeInDown"
          data-wow-delay={`1s`}
        >
          © Бүх эрх хуулиар хамгаалагдсан. {new Date().getFullYear()} он
        </span>
      </div>
    </>
  );
};

export default Footer;
