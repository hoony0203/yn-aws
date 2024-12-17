"use client";

import "./page.scss";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useState } from "react";
import { commonLenis, mainLenis } from "@/util/lenis";
import { createModalStore } from "@/store/modal-store";
import { useGSAP } from "@gsap/react";
import { KarlaLight, KarlaMedium } from "@/fonts";
import MenuModal from "@/components/headers menu-modal/menu-modal";
import AboutYEOWOON from "@/components/about-component/about-YEOWOON";
import AboutTl from "@/components/about-component/about-tl/about-tl";
import { AboutTeam } from "../(menu-header)/about/page";
import AboutSwiper from "@/components/about-component/about-swiper/about-swiper";
import AboutHQ from "@/components/about-component/about-hq/about-hq";
import MainFloatingBar from "@/components/main-floating-bar";

export default function Home() {
  /* Main container About component load
  휠or터치 스크롤로 MainBG 하단의 About component들 로드하기 위한 상태값들
  wheel : 스크롤 후 false // isModalOpen : 메뉴 모달창이 열렸을 때는 휠을 막음 
  aboutY : 스크롤 후 true 
  atl : 스크롤트리거 Enter 후 true   
  */
  const [wheel, setWheel] = useState(true);
  const [aboutY, setAboutY] = useState(false);
  const [atl, setAtl] = useState(false);

  const { isModalOpen } = createModalStore();

  useGSAP(() => {
    gsap.registerPlugin(gsap, ScrollTrigger);
    mainLenis(); // 배수를 크게 줘서 한번에 내려가는 lenis(부드러운 스크롤) 적용
    ScrollTrigger.create({
      //atl 상태값 변경 스크롤 트리거
      trigger: ".ay_container",
      start: "top 10%",
      end: "bottom 10%",
      once: true,
      pinSpacing: false,
      onEnter() {
        setAtl(true);
        commonLenis(); // 배수를 적게 주는 일반 lenis 적용
        gsap.to(".link", {
          // main-floating-bar 스크롤 트리거 이벤트
          opacity: 1,
          display: "block",
          duration: 0.5,
          scrollTrigger: {
            trigger: ".ay_subtitle",
            start: "top 5%",
            end: "50px",
            scrub: true,
          },
        });
      },
    });
  }, [aboutY]);

  return (
    <article className="main_container">
      <section
        className={`main_bg ${KarlaLight.className}`}
        onTouchMove={() => {
          if (isModalOpen === true) return;
          if (wheel === true) {
            setAboutY(true);
            setWheel(true);
          }
        }}
        onWheel={() => {
          if (isModalOpen === true) return;
          if (wheel === true) {
            setAboutY(true);
            setWheel(true);
          }
        }}>
        {/* playsInline : ios에서 영상을 배경으로  */}
        <video loop muted autoPlay playsInline>
          <source
            src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/video/mainBG.mp4`}
            type="video/mp4"
          />
        </video>
        <section>
          {" "}
          {/*svg 직접 삽입 - Image 컴포넌트로 svg 삽입시 로드 지연 */}
          <svg
            className="main_title"
            width="804"
            height="146"
            viewBox="0 0 804 146"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <g id="&#236;&#151;&#172;&#236;&#154;&#180; &#235;&#161;&#156;&#234;&#179;&#160;-01 1">
              <path
                id="Vector"
                d="M38.5 87.5V143.51H72.4V87.5L109.5 3.5V2.5H73.15L72.5 3.5L61.5 35.5L56.5 56.5L55.5 58.5L53.5 53.5L47.5 30.5L38.5 3.25L37.6 2.5H0.400024V4.03L9.50002 22.5L25.5 59.5L38.5 87.5Z"
                fill="white"
              />
              <path
                id="Vector_2"
                d="M121.81 2.5V143.51H205.67V114.22H155.5V84.5H186.5V55.5H155.5V31.5H204.5V2.5H121.81Z"
                fill="white"
              />
              <path
                id="Vector_3"
                d="M330.37 2.5H363.5L371.5 80.5L383.64 2.5H412.5L423.36 80.5L432.59 2.5H465.15L441.5 142.5H409.62L397.76 62.55L385.5 142.5H354.5L330.37 2.5Z"
                fill="white"
              />
              <path
                id="Vector_4"
                d="M707.5 2.5V142.45H738.47V67.63L776.16 142.45H802.98V2.5H771.5V69.5L736.91 2.5H707.5Z"
                fill="white"
              />
              <path
                id="Vector_5"
                d="M564.5 19.5C556.33 6.17 539.14 1.5 526.5 1.5C513.86 1.5 497.67 5.19 489.5 18.5C481.59 31.39 476.5 54.08 476.5 73.5C476.5 89.78 481.73 110.48 487.5 122.5C495.72 139.63 511.9 144.5 526.5 144.5C539.58 144.5 557.28 138.66 565.5 124.5C572.9 111.76 575.5 92.2 575.5 73.5C575.5 54.8 572.4 32.38 564.5 19.5ZM538.8 105.7C536.16 113.76 530.92 116 526.84 116C522.76 116 517.2 113.17 514.56 105.1C512.01 97.3 511 84.15 511 72.4C511 60.65 511.84 49.23 514.23 41.51C516.89 32.93 522.61 29.4 526.84 29.4C531.56 29.4 536.79 32.35 539.45 42.72C541.31 50 543.01 62.53 543.01 72.39C543.01 84.15 541.37 97.89 538.81 105.7H538.8Z"
                fill="white"
              />
              <path
                id="Vector_6"
                d="M677.5 19.5C669.33 6.17 652.14 1.5 639.5 1.5C626.86 1.5 610.67 5.19 602.5 18.5C594.59 31.39 589.5 54.08 589.5 73.5C589.5 89.78 594.73 110.48 600.5 122.5C608.72 139.63 624.9 144.5 639.5 144.5C652.58 144.5 670.28 138.66 678.5 124.5C685.9 111.76 688.5 92.2 688.5 73.5C688.5 54.8 685.4 32.38 677.5 19.5ZM651.8 105.7C649.16 113.76 643.92 116 639.84 116C635.76 116 630.2 113.17 627.56 105.1C625.01 97.3 624 84.15 624 72.4C624 60.65 624.84 49.23 627.23 41.51C629.89 32.93 635.61 29.4 639.84 29.4C644.56 29.4 649.79 32.35 652.45 42.72C654.31 50 656.01 62.53 656.01 72.39C656.01 84.15 654.37 97.89 651.81 105.7H651.8Z"
                fill="white"
              />
              <path
                id="Vector_7"
                d="M306.5 19.5C298.33 6.17 281.14 1.5 268.5 1.5C255.86 1.5 239.67 5.19 231.5 18.5C223.59 31.39 218.5 54.08 218.5 73.5C218.5 89.78 223.73 110.48 229.5 122.5C237.72 139.63 253.9 144.5 268.5 144.5C281.58 144.5 299.28 138.66 307.5 124.5C314.9 111.76 317.5 92.2 317.5 73.5C317.5 54.8 314.4 32.38 306.5 19.5ZM280.8 105.7C278.16 113.76 272.92 116 268.84 116C264.76 116 259.2 113.17 256.56 105.1C254.01 97.3 253 84.15 253 72.4C253 60.65 253.84 49.23 256.23 41.51C258.89 32.93 264.61 29.4 268.84 29.4C273.56 29.4 278.79 32.35 281.45 42.72C283.31 50 285.01 62.53 285.01 72.39C285.01 84.15 283.37 97.89 280.81 105.7H280.8Z"
                fill="white"
              />
            </g>
          </svg>
          <div className="script_1">
            <p className={KarlaMedium.className}>
              It's uncustomary joy after sentiment fades down
            </p>
          </div>
          <div className="script_2">
            <p>
              We create jewelry that lasts a long time, like a yeowoon,{" "}
              <br />a feeling people can look back on for as long as they
              want
            </p>
          </div>
        </section>
        <svg
          className="mainArrow"
          viewBox="0 0 300 103"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1 18L74.5649 59.5L154.78 101L299 18"
            stroke="#CCCCCC"
            strokeWidth="3"
          />
          <path
            d="M1 2L74.5649 43.5L154.78 85L299 2"
            stroke="#CCCCCC"
            strokeWidth="3"
          />
        </svg>
        <MenuModal />{" "}
        {/* Create Portal로 생성한 모달은 layout에서 포탈을 생성해도 사용하는 컴포넌트마다 불러와야 표시됨 */}
      </section>
      {aboutY === true && (
        <article className="main_about_container">
          <AboutYEOWOON />
          {atl === true && (
            <>
              <AboutTl />
              <AboutTeam />
              <AboutSwiper />
              <AboutHQ />
            </>
          )}
          <MainFloatingBar />
        </article>
      )}
    </article>
  );
}
