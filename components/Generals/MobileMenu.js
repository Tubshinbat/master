"use client";
import { languageBuild } from "lib/language";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const MobileMenu = ({ toggleMenu, menus = [] }) => {
  const [cookies] = useCookies(["language", "template"]);
  const [currentMenu, setCurrentMenu] = useState(menus); // Одоогийн харагдах цэс
  const [menuHistory, setMenuHistory] = useState([]); // Буцах замналын стэк
  const pathname = usePathname();

  // Цэсийг дүрслэх функц
  const renderMenu = (categories) => {
    if (!categories || categories.length === 0) {
      return <p>No menu items available</p>;
    }

    return categories.map((category, index) => {
      const { children } = category;
      const path =
        category.direct ||
        category.model ||
        category.slug ||
        category.newsCategory;
      const isActive = path === pathname;
      const name = languageBuild(category, "name", cookies.language);
      const hasChildren = children && children.length > 0;

      return (
        <li
          key={`${category._id}-${index}`}
          className={`menu-item ${hasChildren ? "dropMenu" : ""} ${
            isActive ? "active" : ""
          }`}
        >
          {hasChildren ? (
            <a
              href="#"
              className="header-link"
              onClick={() => handleChild(children)}
            >
              {name}
              <i className="fa-solid fa-arrow-right"></i>
            </a>
          ) : (
            <Link
              scroll={true}
              href={renderLink(category)}
              className="header-link"
              target={category.inWindow ? "_blank" : ""}
            >
              {name}
            </Link>
          )}
        </li>
      );
    });
  };

  // Туслах функц: Замыг тодорхойлох
  const renderLink = (category) => {
    switch (true) {
      case category.isDirect:
        return category.direct;
      case category.isModel:
        return "/" + category.model;
      case category.isCategory:
        return "/news?categories=" + category.newsCategory;
      default:
        return "/page/" + category.slug;
    }
  };

  // Дэд цэс рүү шилжих
  const handleChild = (children) => {
    if (children && children.length > 0) {
      // Өмнөх цэсийг стэкт нэмэх
      setMenuHistory((prev) => [...prev, currentMenu]);
      setCurrentMenu(children); // Одоогийн харагдах цэсийг шинэчлэх
    }
  };

  // Буцах функц
  const handleBack = () => {
    if (menuHistory.length > 0) {
      // Стэкийн хамгийн сүүлийн цэсийг сэргээх
      const lastMenu = menuHistory[menuHistory.length - 1];
      setMenuHistory((prev) => prev.slice(0, -1)); // Сүүлийн элементийг устгах
      setCurrentMenu(lastMenu);
    }
  };

  return (
    <div className="mobile_menu">
      <button className="mobile_menu_close" onClick={toggleMenu}>
        ✕
      </button>
      {/* Буцах товчийг динамикаар харуулна */}
      {menuHistory.length > 0 && (
        <div className="mobile_menu_back" onClick={handleBack}>
          <i className="fa-solid fa-arrow-left"></i>{" "}
          {cookies.language == "eng" ? "Back" : "Буцах"}
        </div>
      )}
      {/* Одоогийн цэс */}
      <ul>{renderMenu(currentMenu)}</ul>
    </div>
  );
};

export default MobileMenu;
