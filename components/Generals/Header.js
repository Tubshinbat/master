"use client";
import Link from "next/link";
import base from "lib/base";

import { useAuthContext } from "context/authContext";
import { usePathname } from "next/navigation";

const Header = ({ info, menus }) => {
  const { user } = useAuthContext();
  const pathname = usePathname();

  const renderMenu = (categories, child = false, parentSlug = "") => {
    let customCategories = [];

    Array.isArray(categories) &&
      categories.map((category) => {
        const { direct, model, slug, children, newsCategory } = category;
        const path = direct || model || slug || newsCategory;
        const isActive = path === pathname;
        const name = category.name;
        const isChildren = children && children.length > 0;

        const renderLink = () => {
          if (category.isDirect) return direct;
          if (category.isModel) return "/" + model;
          if (category.isCategory) return "/news?categories=" + newsCategory;
          return "/page/" + slug;
        };

        customCategories.push(
          <li
            key={category._id}
            className={`menu-item ${isChildren ? " dropMenu" : ""} ${
              isActive ? " active" : ""
            }`}
          >
            {isChildren ? (
              // Dropdown цэс: Зөвхөн href="#"
              <a href="#" className="header-link">
                {name}
                <i className="fa-solid fa-angle-down"></i>
              </a>
            ) : (
              // Энгийн цэс: Зөвхөн хуудас руу үсрэх линк
              <Link
                scroll={true}
                href={renderLink()}
                className="header-link"
                target={category.inWindow ? "_blank" : ""}
              >
                {name}
              </Link>
            )}
            {/* Хэрэв дэд цэс байвал харуулна */}
            {isChildren && category.children.length > 0 && (
              <ul className="sub-menu">{renderMenu(category.children)}</ul>
            )}
          </li>
        );
      });

    return customCategories;
  };

  return (
    <>
      <header className="header-top">
        <div className="container-fluid">
          <div className="header-inner">
            <div className="header-left">
              <div className="logo">
                <Link href="/">
                  <img src={`${base.cdnUrl}/${info?.logo}`} alt="logo" />
                </Link>
              </div>
              <nav className="header-menus">{renderMenu(menus)}</nav>
            </div>
            <div className="header-right">
              <div className="header-login">
                {user ? (
                  <Link href="/profile" className="login-user">
                    <i className="fa-solid fa-user"></i>
                    <span>{user.name}</span>
                  </Link>
                ) : (
                  <>
                    <Link href="/register" className=" register-btn">
                      <span>Бүртгүүлэх</span>
                    </Link>
                    <Link href="/login" className=" login-btn">
                      <span>Нэвтрэх</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
