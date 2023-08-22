"use client";
import { useState } from "react";
import { renderMenu } from "lib/menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const MobileMenu = ({ menus, info }) => {
  const [active, setActive] = useState(false);

  const backGo = () => {
    router.back();
  };

  const handleToggle = () => {
    setActive((ba) => {
      if (ba === true) return false;
      else return true;
    });
  };

  return (
    <>
      <div className="burger__menu" onClick={handleToggle}>
        <span className="line"> </span>
        <span className="line"> </span>
        <span className="line"> </span>
      </div>
      <div
        className={`menuMobile  ${
          active === true ? "displayBlock" : "displayNone"
        }`}
      >
        <h5>
          <FontAwesomeIcon icon={faClose} onClick={handleToggle} /> Үндсэн цэс
        </h5>
        <ul>{renderMenu(menus)}</ul>
        <div className="contactMobile">
          {info && (
            <>
              <li>
                <a href={`tel:${info.phone}`}> Утас: {info.phone} </a>
              </li>
              <li>
                <a href={`mailto:${info.email}`}> Имэйл: {info.email} </a>
              </li>
              <li>Хаяг: {info.address}</li>
            </>
          )}
        </div>
        {/* <div className="socialMobile">
          {socialLinks &&
            socialLinks.map((el) => (
              <a href={el.link} key={`${el._id}-som`} target="_blank">
                <i
                  className={`fa-brands fa-${el.name.toLowerCase()}-square`}
                ></i>
              </a>
            ))}
        </div> */}
      </div>
      <div
        className={`menuMobile-bg ${
          active === true ? "displayBlock" : "displayNone"
        }`}
        onClick={handleToggle}
      ></div>
    </>
  );
};

export default MobileMenu;
