"use client";

import Side from "components/Userprofile/Side";
import { useAuthContext } from "context/authContext";
import Spinner from "components/Generals/Spinner";

export default function RootLayout({ children }) {
  const { user } = useAuthContext();

  return (
    <>
      <section className="profile-section">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <Side />
            </div>
            <div className="col-md-9">
              <div className="user-box">
                <div className="pro-box user-form-box">
                  <div className="user-form-header">
                    <h4> Шагнал </h4>
                  </div>
                  <div className="user-form-control"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
