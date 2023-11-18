"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import base from "lib/base";
import AOS from "aos";
import { getWebInfo } from "lib/webinfo";
import { getMenus, renderMenu } from "lib/menu";
import MobileMenu from "./MobileMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "context/authContext";

const Header = () => {
  const { user } = useAuthContext();
  const [info, setInfo] = useState(null);
  const [menu, setMenu] = useState([]);
  const [phone, setPhone] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { info } = await getWebInfo();
      if (info) {
        setInfo(info);
        setPhone(info.phone.split(","));
      }
      const { menus } = await getMenus();
      menus && setMenu(menus);
      AOS.init();
    };

    fetchData().catch((error) => console.log(error));
  }, []);

  return (
    <header className="top-header">
      <div className="container main-header">
        <div className="top-header-right">
          <div className="header-logo">
            {info && (
              <Link href="/">
                <img
                  src={`${base.cdnUrl}/${info.logo}`}
                  className="logo-image"
                />
              </Link>
            )}
          </div>
          <ul className="header-menus">{renderMenu(menu)}</ul>
        </div>
        <div className="top-header-left">
          <form method="get" action="/search" className="search-box">
            <input
              className="search-input"
              name="name"
              placeholder="Хайлт хийх..."
            />
            <button className="search-btn" type="submit">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>
          <MobileMenu menus={menu} info={info} />
          {!user ? (
            <Link href="/login" className="user-header-btn">
              <FontAwesomeIcon icon={faUserAlt} />
            </Link>
          ) : (
            <Link href="/profile" className="user-header-btn">
              <FontAwesomeIcon icon={faUserAlt} />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
