"use client";

import "./about-swiper.scss";
import Image from "next/image";
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, A11y, Navigation } from "swiper/modules";
import { notoSansBlack, notoSansBold } from "@/fonts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  aboutSwiper,
  aboutSwiperProperty,
} from "@/data/about/aboutSwiper";
import Script from "@/components/script-component";

const AboutSwiper = () => {
  const { asBreakpoint, navigation } = aboutSwiperProperty;
  return (
    <article className="as_container">
      <header className={`swiperTitle ${notoSansBlack.className}`}>
        <h2>Strengthen of Us</h2>
      </header>
      <Swiper
        breakpoints={asBreakpoint}
        a11y={{ enabled: true }}
        loop={true}
        loopAddBlankSlides={false}
        slidesPerGroup={1}
        modules={[Pagination, Autoplay, A11y, Navigation]}
        autoplay={{
          delay: 3000,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={navigation}
        className="about_swiper">
        <div className="swiper-button-next swiper-nav">
          <FontAwesomeIcon
            className="linkIcon"
            icon={faAngleRight}
            size="2xs"
          />
        </div>
        <div className="swiper-button-prev swiper-nav">
          <FontAwesomeIcon
            className="linkIcon"
            icon={faAngleLeft}
            size="2xs"
          />
        </div>
        {aboutSwiper.map(({ id, ImgUrl, label, script }) => {
          return (
            <SwiperSlide key={id} className="about_swiperSlide">
              <figure className="swiperImg">
                <Image
                  className="swiperImg_file"
                  src={ImgUrl}
                  alt={label}
                  width={400}
                  height={160}
                />
                <p className={notoSansBlack.className}>
                  <Script param={label} />
                </p>
              </figure>
              <label className="swiperScript">
                <span>
                  <Script param={script} />
                </span>
              </label>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </article>
  );
};

export default AboutSwiper;
