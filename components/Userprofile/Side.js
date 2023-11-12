import { faResearchgate } from "@fortawesome/free-brands-svg-icons";
import {
  faAward,
  faBuilding,
  faSignOut,
  faStar,
  faUser,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuthContext } from "context/authContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Side = () => {
  const { logOut } = useAuthContext();
  const pathname = usePathname();
  return (
    <>
      <div className="profile-sides">
        <div className="profile-side">
          <ul className="profile-menus">
            <li>
              <Link
                href="/profile"
                className={`${
                  ("/profile" === pathname && "active") ||
                  ("/profile/info" === pathname && "active") ||
                  ("/profile/password" === pathname && "active")
                }`}
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
            <li>
              <Link
                href="/profile/reward"
                className={`${"/profile/reward" === pathname && "active"}`}
              >
                <div className="menu-icon">
                  <FontAwesomeIcon icon={faAward} />
                </div>
                Шагнал
              </Link>
            </li>
            <li>
              <Link
                href="/profile/research"
                className={`${"/profile/research" === pathname && "active"}`}
              >
                <div className="menu-icon">
                  <FontAwesomeIcon icon={faResearchgate} />
                </div>
                Оролцсон судалгаа
              </Link>
            </li>

            <li className="logout-item">
              <a href="#" onClick={logOut}>
                <div className="menu-icon">
                  <FontAwesomeIcon icon={faSignOut} />
                </div>
                Системээс гарах
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Side;
