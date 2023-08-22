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
            <div className="col-lg-4">
              <div className="contactInfos ">
                <div className="contactInfo">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                  <p>{webInfo.address}</p>
                </div>

                <div className="contactInfo">
                  <FontAwesomeIcon icon={faPhoneAlt} />
                  <p>
                    <a href={`tel:${webInfo.phone}`}> {webInfo.phone}</a>
                  </p>
                </div>

                <div className="contactInfo">
                  <FontAwesomeIcon icon={faEnvelope} />
                  <p>
                    <a href={`tel:${webInfo.email}`}> {webInfo.email}</a>
                  </p>
                </div>

                <div className="contactInfo">
                  <FontAwesomeIcon icon={faCalendar} />
                  <div className="a" style={{ flexDirection: "column" }}>
                    <p>Дав-Ба 10:00-17:00</p>
                    <p>Бямба 10:00-16:00</p>
                    <p>Ням гарагт амарна</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <div
                style={{
                  height: "400px",
                  width: "100%",
                  padding: "10px",
                  boxShadow: "0px 0px 15px rgb(0 0 0 / 8%)",
                }}
              >
                <Wrapper apiKey={"AIzaSyBVbaukknpuyvHnYSK_MmpI-5pcBwz83kw"}>
                  <Map
                    latitude={47.90457330248492}
                    longitude={106.92498201582214}
                  ></Map>
                </Wrapper>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const Map = ({ latitude, longitude, children }) => {
  const ref = useRef(null);
  const [map, setMap] = useState(google.maps.Maps || null);

  useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new google.maps.Map(ref.current, {
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: true,
          center: {
            lat: latitude ?? 0,
            lng: longitude ?? 0,
          },
          zoom: 13,
        })
      );
    }
  }, [ref, map, latitude, longitude]);

  const marker = new google.maps.Marker({
    position: { lat: 47.90457330248492, lng: 106.92498201582214 },
    map: map,
  });

  return (
    <>
      <div ref={ref} style={{ height: "100%", width: "100%" }} />
    </>
  );
};

export default ContactPage;
