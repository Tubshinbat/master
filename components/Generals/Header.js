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
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
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
                <Image
                  src={`${base.cdnUrl}/${info.logo}`}
                  width="0"
                  height="0"
                  sizes="100vw"
                  quality="100"
                  className="logo-image"
                />
              </Link>
            )}
          </div>
        </div>
        <div className="top-header-left">
          <ul className="header-menus">{renderMenu(menu)}</ul>
          <div className="search-box">
            <input className="search-input" placeholder="Хайлт хийх..." />
            <button className="search-btn">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
          <MobileMenu menus={menu} info={info} />
        </div>
      </div>
    </header>
  );
};

export default Header;
