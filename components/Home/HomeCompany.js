import React, { useEffect, useState } from "react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import Link from "next/link";
import base from "lib/base";
import Image from "components/Generals/Image";

const HomeCompany = ({ companies }) => {
  return (
    <div className="section">
      <div className="container">
        <div className="section__header">
          <h4>Байгууллага</h4>
          <Link href="/partners">Цааш харах</Link>
        </div>
        <div className="section__body">
          <Swiper
            modules={[Navigation, Autoplay]}
            slidesPerView={4}
            spaceBetween={15}
            breakpoints={{
              0: {
                slidesPerView: 2,
              },
              767: {
                slidesPerView: 3,
              },
              992: {
                slidesPerView: 4,
              },
            }}
            navigation={{
              prevEl: ".custom__slider_prev",
              nextEl: ".custom__slider_next",
            }}
            className="copmany-swiper"
          >
            {companies &&
              companies.map((item) => (
                <SwiperSlide key={item._id} className="company-item">
                  <Link
                    href={`/partners/${item._id}`}
                    className="company-item__link"
                  >
                    <div className="company-item__inner">
                      <div
                        className="company-item__header"
                        style={{
                          backgroundImage: `url(${
                            item.cover
                              ? base.cdnUrl + "/" + item.cover
                              : "/images/cover-bg.jpg"
                          })`,
                        }}
                      >
                        <div className="company-item__body">
                          <div className="company-item__logo-bg">
                            <Image
                              image={item.logo}
                              alt={item.name}
                              className="company-item__logo"
                            />
                          </div>
                          <h5 className="company-item__title">{item.name}</h5>
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default HomeCompany;
