import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/grid";

import Link from "next/link";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Grid } from "swiper";
import MemberItem from "components/Members/MemberItem";

const HomeExperts = ({ members }) => {
  return (
    <>
      <div className="section">
        <div className="container">
          <div className="section__header">
            <h4>Экспертүүд</h4>
            <Link href="/experts">Цааш харах</Link>
          </div>
          <div className="section__body">
            <Swiper
              modules={[Navigation, Autoplay, Grid]}
              slidesPerView={5}
              spaceBetween={15}
              navigation={{
                prevEl: ".custom__slider_prev",
                nextEl: ".custom__slider_next",
              }}
              className="member-swiper"
            >
              {members &&
                members.map((item) => (
                  <SwiperSlide key={item._id}>
                    <MemberItem data={item} />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeExperts;
