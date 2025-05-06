import React from "react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";

const LineWorkList = ({ works }) => {
  return (
    <div className="line-works-list">
      <div className="container-fluid">
        <Swiper
          modules={[Navigation, Autoplay]}
          slidesPerView="auto"
          spaceBetween={10}
          navigation={{
            prevEl: ".custom__slider_prev",
            nextEl: ".custom__slider_next",
          }}
          className="works-swiper"
        >
          {works &&
            works.map((item) => (
              <SwiperSlide
                key={item._id}
                className="work-line-item"
                style={{ width: "auto" }} // ✨ width auto болгож байна
              >
                <span>{item.name}</span>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default LineWorkList;
