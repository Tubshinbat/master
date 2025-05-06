"use client";

import {
  faFacebookF,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import base from "lib/base";
import { getPartners, getSocialLinks } from "lib/getFetchers";
import { getWebInfo } from "lib/webinfo";
import { useEffect, useState } from "react";

const Footer = () => {
  const [partners, setPartners] = useState([]);
  const [info, setInfo] = useState({});
  const [phone, setPhone] = useState([]);
  const [socials, setSocial] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { partners } = await getPartners(`status=true&limit=5`);
      const { info } = await getWebInfo();
      const { socials } = await getSocialLinks();
      if (info) {
        setPhone(info.phone.split(","));
        setInfo(info);
      }
      setSocial(socials || []);
      setPartners(partners);
    };
    fetchData().catch((error) => console.log(error));
  }, []);
  return (
    <>
      <footer>
        <div className="container">
          <div className="row g-4">
            <div className="col-xl-4 col-lg-4 col-md-12">
              <div className="footer-about">
                <img src={`${base.cdnUrl}/${info.whiteLogo}`} />
                <p>{info.siteInfo}</p>
              </div>
            </div>
            <div className="col-xl-4  col-lg-4 col-md-12">
              <ul className="footer-menus">
                <li>
                  <a href={base.baseUrl}> Эхлэл </a>
                </li>
                <li>
                  <a href={base.baseUrl + "/members"}>Гишүүн</a>
                </li>
                <li>
                  <a href={base.baseUrl + "/news"}> Зөвлөгөө, мэдээлэл </a>
                </li>

                <li>
                  <a href={base.baseUrl + "/contact"}> Холбоо барих </a>
                </li>
              </ul>
            </div>
            <div className="col-xl-4  col-lg-4 col-md-12">
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
                  {socials &&
                    socials.map((item) => (
                      <a href={item.link} key={item._id} target="_blank">
                        <i
                          className={`fa-brands fa-${item.name.toLowerCase()}`}
                        />
                      </a>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className={`footer-bar`}>
        <span>
          © Бүх эрх хуулиар хамгаалагдсан. {new Date().getFullYear()} он
        </span>
      </div>
    </>
  );
};

export default Footer;
