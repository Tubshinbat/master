"use client";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "components/Generals/Loader";
import Side from "components/Userprofile/Side";
import { useAuthContext } from "context/authContext";
import { useNotificationContext } from "context/notificationContext";
import Link from "next/link";
import { useEffect } from "react";

export default function RootLayout({ children }) {
  const { user, checkUser } = useAuthContext();
  const { contentLoad, setContentLoad } = useNotificationContext();
  if (contentLoad)
    return (
      <>
        {" "}
        <section className="profile-section">
          <div className="container">
            <div className="row">
              <Loader />
            </div>
          </div>
        </section>
      </>
    );

  return (
    <>
      <section className="profile-section">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <Side />
            </div>
            <div className="col-md-9">
              <div className="profile-box">
                {/* <h4> Хувийн мэдээлэл </h4>

                <div className="userData-box">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="pro-box profile-info">
                        <div className="profile">
                          <div className="pic">
                            {user && user.image ? (
                              <img
                                className="pic-img"
                                src={base.cdnUrl + "/" + user.image}
                              />
                            ) : (
                              <img
                                className="pic-img"
                                src="/images/no-avatar.jpeg"
                              />
                            )}
                          </div>
                          <p className="username"> {user && user.firstName} </p>
                          <Link href="/userprofile/info"> Мэдээлэл засах </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="row">
                        <div className="col-md-6">
                          <Link href="/userprofile/info">
                            <div className="pro-box profile-details">
                              <FontAwesomeIcon icon={faUser} />
                              <h6> Хувийн мэдээлэл </h6>
                              <span> Мэдээлэл засах </span>
                            </div>
                          </Link>
                        </div>
                        <div className="col-md-6">
                          <Link href="/userprofile/password">
                            <div className="pro-box  profile-details">
                              <FontAwesomeIcon icon={faLock} />
                              <h6> Нууц үг </h6>
                              <span> Шинэчлэх </span>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
