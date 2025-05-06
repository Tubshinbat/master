import Link from "next/link";
import React, { useEffect, useState } from "react";

import { Autoplay, Navigation } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import { getMemberCategories } from "lib/getFetchers";
import Image from "components/Generals/Image";

const HomeWokrs = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { categories } = await getMemberCategories();
      console.log(categories);
      setData(categories || []);
    };

    fetchData().catch((error) => console.log(error));
  }, []);

  return (
    <div className="section">
      <div className="container">
        <div className="section__header">
          <h4>Мэргэжилүүд</h4>
          <Link href="#">Цааш харах</Link>
        </div>
        <Swiper
          modules={[Navigation, Autoplay]}
          slidesPerView={5.4}
          breakpoints={{
            0: {
              slidesPerView: 2.5,
            },
            767: {
              slidesPerView: 3.5,
            },
            992: {
              slidesPerView: 4.5,
            },
            1210: {
              slidesPerView: 5.4,
            },
          }}
          spaceBetween={10}
          className="profession__slide"
          loop={true}
          autoplay={{
            delay: 5000,
          }}
          navigation={{
            prevEl: ".custom__slider_prev",
            nextEl: ".custom__slider_next",
          }}
        >
          {data &&
            data.map((el) => (
              <SwiperSlide key={el._id}>
                <Link href={`/members?categories=${el._id}`}>
                  <div className="profession_item">
                    <img src={`/images/salon.jpg`} />
                    <div className="profession_content">{el.name}</div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HomeWokrs;
