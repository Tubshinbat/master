import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/grid";

import Link from "next/link";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Grid } from "swiper";
import MemberItem from "components/Members/MemberItem";

const HomeNewMembers = ({ members }) => {
  return (
    <>
      <div className="section">
        <div className="container">
          <div className="section__header">
            <h4>Шинэ гишүүд</h4>
            <Link href="/members">Цааш харах</Link>
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
              <div className="section__body">
                <div className="row g-4">
                  {members &&
                    members.map((item) => (
                      <div
                        className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6"
                        key={item._id}
                      >
                        <MemberItem data={item} />
                      </div>
                    ))}
                </div>
              </div>
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeNewMembers;
