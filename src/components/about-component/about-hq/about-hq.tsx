"use client";

import { faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./about-hq.scss";
import Image from "next/image";
import AboutHqFooter from "./about-hq-footer";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { notoSansBold,notoSansBlack } from "@/fonts";
import { aboutHQ } from "@/data/about/about";

const AboutHQ = () => {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // 리사이즈 감지, 너비 상태값 지정 end

  /* 
  pathname / mobile_footer 클래스
  메인 페이지의 about 컴포넌트일 때
  1080 이하 모바일푸터에 맞는 그리드 크기 설정 
  */
  const pathname = usePathname().replace("/", "");
  const { hqImg } = aboutHQ;
  return (
    <article
      className={`ahq_container ${
        pathname !== "about" && width <= 1080 ? `mobile_footer` : ""
      } ${notoSansBold.className}`}>
      <header className={`ahq_title ${notoSansBlack.className}`}>
        <h2>Head Quarters</h2>
      </header>
      <section className="ahq_content">
        <figure className="ahq_img">
          <Image
            priority
            style={{}}
            src={hqImg}
            width={770}
            height={560}
            alt={"HQ Image"}
          />
        </figure>
        <figure className="ahq_map notosans">
          <div>
            <iframe
              className="gmap"
              width={"100%"}
              height={"445"}
              style={{}}
              loading={"lazy"}
              allowFullScreen
              src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GMAP_API_KEY}&q=${process.env.NEXT_PUBLIC_YEOWOON_ADDRESS}&region=KR&language=ko`}></iframe>
            <FontAwesomeIcon
              icon={faMapLocationDot}
              size="3x"
              className="mapIcon"
            />
            <p>7, Insadong 1-gil, Jongno-gu, Seoul,</p>
            <p>Republic of Korea</p>
          </div>
        </figure>
      </section>
      <AboutHqFooter />
    </article>
  );
};

export default AboutHQ;
