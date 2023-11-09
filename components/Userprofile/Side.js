import {
  faBuilding,
  faStar,
  faUser,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Side = () => {
  const pathname = usePathname();
  return (
    <>
      <div className="profile-sides">
        <div className="profile-side">
          <ul className="profile-menus">
            <li>
              <Link
                href="/profile"
                className={`${"/profile" === pathname && "active"}`}
              >
                <div className="menu-icon">
                  <FontAwesomeIcon icon={faUser} />
                </div>
                Хувийн мэдээлэл
              </Link>
            </li>
            <li>
              <Link
                href="/profile/jobs"
                className={`${"/profile/jobs" === pathname && "active"}`}
              >
                <div className="menu-icon">
                  <FontAwesomeIcon icon={faBuilding} />
                </div>
                Ажлын туршилга
              </Link>
            </li>
            <li>
              <Link
                href="/profile/participation"
                className={`${
                  "/profile/participation" === pathname && "active"
                }`}
              >
                <div className="menu-icon">
                  <FontAwesomeIcon icon={faStar} />
                </div>
                Нийгмийн оролцоо
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Side;
