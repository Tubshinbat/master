import fetcher from "fetcher";
import Link from "next/link";
import base from "./base";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";
export const revalidate = 60;

export const getMenus = async () => {
  try {
    const result = await fetcher(`${base.apiUrl}/menus`);
    return { menus: result.data };
  } catch (error) {
    return { error };
  }
};

export const renderMenu = (categories, child = false, parentSlug = "") => {
  const pathname = usePathname();
  let myCategories = [];
  categories &&
    categories.map((el) => {
      myCategories.push(
        <li key={el._id} className={el.children.length > 0 && "dropMenu"}>
          {el.isDirect === true && (
            <Link
              href={el.direct}
              className={`header-link ${el.direct === pathname && "active"}`}
            >
              {el.name}
              {el.children.length > 0 && "dropMenu" && (
                <span>
                  <FontAwesomeIcon icon={faChevronDown} />
                </span>
              )}
            </Link>
          )}
          {el.isModel === true && (
            <Link
              href={`/${el.model}`}
              className={`header-link ${
                "/" + el.model === pathname && "active"
              }`}
              scroll={false}
            >
              {el.name}
              {el.children.length > 0 && "dropMenu" && (
                <span>
                  <FontAwesomeIcon icon={faChevronDown} />
                </span>
              )}
            </Link>
          )}

          {el.isDirect === false && el.isModel === false && (
            <Link
              href={`/page/${el.slug}`}
              className={`header-link ${
                "/page/" + el.slug === pathname && "active"
              }`}
              scroll={false}
            >
              {el.name}
              {el.children.length > 0 && "dropMenu" && (
                <span>
                  <FontAwesomeIcon icon={faChevronDown} />
                </span>
              )}
            </Link>
          )}

          {el.children.length > 0 && !child ? (
            <ul className={`dropdownMenu`}>
              {renderMenu(el.children, true, el.slug)}
            </ul>
          ) : null}
        </li>
      );
    });

  return myCategories;
};
