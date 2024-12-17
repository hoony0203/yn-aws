"use client";

import Image from "next/image";
import AboutTlItem from "./about-tl-item";
import "./about-tl.scss";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import { gsap } from "gsap";
import { useRef } from "react";
import { notoSansBlack } from "@/fonts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { tlImg, tlYear } from "@/data/about/aboutTl";

const AboutTl = () => {
  const tlRef = useRef(null);
  gsap.registerPlugin(gsap);
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  useGSAP(() => {
    const imgFade = gsap.timeline({
      defaults: {
        ease: "none",
      },
    });
    const { toArray } = gsap.utils;
    const imgs: HTMLElement[] = toArray(".imgLR");
    let imgR: any[] = [];
    imgs.map((img, i) => {
      imgR.push(img.querySelector(".atl_r"));
    });
    // 네비게이션 클릭시 이동 구현
    if (window.innerWidth > 768) {
      const nav: HTMLElement[] = toArray(".navs");
      const label = ["#year0", "#year4", "#year6", "#year8"];

      nav.forEach((a, i) => {
        const naviST = ScrollTrigger.create({
          trigger: label[i],
          start: "top 60px",
        });
        ScrollTrigger.create({
          trigger: label[i],
          start: "top center",
          end: "bottom center",
        });
        a.addEventListener("click", (e) => {
          e.preventDefault();
          if (i == 0) {
            gsap.to(window, { scrollTo: naviST.start });
          } else {
            gsap.to(window, { scrollTo: naviST.end - window.innerHeight });
          }
        });
      });
      // 스클롤 트리거로 동작할 애니메이션
      const fadeDefaults = {
        slide: { duration: 3, top: "5rem", left: "8rem" },
        imgNavShow: { duration: 3, opacity: 1 },
        imgNavFade: { duration: 1, opacity: 0 },
        yearFade: { duration: 1, rotateX: -90 },
      };

      const ImgYearTl = (param: number) => {
        if (param === 0) {
          imgFade
            .to([imgs[param], nav[param]], fadeDefaults.imgNavFade, "<0.5")
            .to(`.year${param}`, fadeDefaults.yearFade, "<");
        }
        if (param === 1 || param === 2) {
          imgFade
            .to([imgs[param], nav[param]], fadeDefaults.imgNavShow)
            .to(imgR[param], fadeDefaults.slide, "<0.5")
            .to(`.year${param}`, { duration: 3, rotateX: 0 }, "<")
            .to([imgs[param], nav[param]], fadeDefaults.imgNavFade)
            .to(`.year${param}`, fadeDefaults.yearFade, "<");
        }
        if (param === 3) {
          imgFade
            .to([imgs[param], nav[param]], fadeDefaults.imgNavShow)
            .to(imgR[param], fadeDefaults.slide)
            .to(".year3", { duration: 1, rotateX: 0 }, "<");
        }
        return imgFade;
      };

      imgR.map((r, i) => {
        ImgYearTl(i);
      });

      //스크롤 트리거 설정
      ScrollTrigger.create({
        animation: imgFade,
        trigger: tlRef.current,
        start: "top 10%",
        end: "bottom bottom",
        scrub: true,
        id: "atl_img",
        onEnter() {
          const tl = gsap.timeline({
            defaults: {
              duration: 2,
            },
          });
          tl.to(
            imgR[0],
            {
              top: "5rem",
              left: "5rem",
            },
            "<"
          );
        },
      });
      // 스크롤 트리거진행하는동안 고정할 객체설정
      const pinDivs = [".atl_img", ".scroll"];
      pinDivs.forEach((pinDiv) => {
        ScrollTrigger.create({
          trigger: pinDiv,
          endTrigger: ".atl_attends",
          start: "top 10%",
          end: "bottom bottom",
          pin: true,
        });
      });
    }
    // 모바일 슬라이드 가이드 애니메이션 설정
    const slideGuide = gsap.timeline({
      repeat: 1,
    });
    slideGuide
      .to(".slideguide", { duration: 0.5, opacity: 0.5 })
      .fromTo(
        ".slideguide",
        { opacity: 0.5, x: 0 },
        { duration: 1, opacity: 0, x: 40 }
      )
      .set(".slideguide", { x: 0, opacity: 0, delay: 2 });

    ScrollTrigger.create({
      animation: slideGuide,
      trigger: ".atl_contents",
      start: "top 80%",
    });
  });

  const CollNavs = () => {
    const navis = [];
    for (let i = 0; i < 4; i++) {
      navis.push(
        <div key={i} className="nav_item">
          <div id={`nav${i}`} className="navs"></div>
        </div>
      );
    }
    return navis;
  };

  return (
    <article className="atl_container" ref={tlRef}>
      <header className={`atl_title ${notoSansBlack.className}`}>
        HISTORY
      </header>
      <section className="atl_contents">
        <figure className="atl_img">
          {tlImg.map(({ l, r }, i) => {
            return (
              <div className="imgLR" key={i}>
                <Image
                  className="atl_l"
                  src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/img/about/tl/tl-r1.jpg`}
                  width={660}
                  height={680}
                  style={{}}
                  alt={"atl-l"}
                />
                <Image
                  className="atl_r"
                  src={`${r}`}
                  width={660}
                  height={680}
                  style={{}}
                  alt={"atl-r"}
                />
              </div>
            );
          })}

          {tlYear.map(({ yearL, yearR }, i) => {
            return (
              <section key={i} className="atl_year_digit">
                <div className="yearF">
                  <h2 className={`year${i}`}>{yearL} ~</h2>
                </div>
                <div className="yearS">
                  <h2 className={`year${i}`}>{yearR}</h2>
                </div>
              </section>
            );
          })}
        </figure>
        <svg
          className="tl_line_horizon"
          height="4"
          viewBox="0 0 2920 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            id="tl_line_horizon_path"
            d="M0 2H2920"
            stroke="white"
            strokeWidth="40"
          />
        </svg>

        <AboutTlItem />
        <figure className="scroll">
          <CollNavs />
        </figure>
      </section>
      <div className="atl_end"></div>
      <p className="slideguide">
        <FontAwesomeIcon icon={faArrowRight} size="xs" />
      </p>
    </article>
  );
};

export default AboutTl;
