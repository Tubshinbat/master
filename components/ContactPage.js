"use client";
import { Wrapper } from "@googlemaps/react-wrapper";
import { useEffect, useRef, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faEnvelope,
  faMapMarkerAlt,
  faPhone,
  faPhoneAlt,
} from "@fortawesome/free-solid-svg-icons";

const ContactPage = ({ webInfo }) => {
  return (
    <>
      <section className="section ">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="row contactInfos ">
                <div className="col-lg-4">
                  <div className="contactInfo">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    <p>{webInfo.address}</p>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="contactInfo">
                    <FontAwesomeIcon icon={faPhoneAlt} />
                    <p>
                      <a href={`tel:${webInfo.phone}`}> {webInfo.phone}</a>
                    </p>
                  </div>
                </div>{" "}
                <div className="col-lg-4">
                  <div className="contactInfo">
                    <FontAwesomeIcon icon={faEnvelope} />
                    <p>
                      <a href={`tel:${webInfo.email}`}> {webInfo.email}</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
