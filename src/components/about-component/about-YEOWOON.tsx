"use client";

import Image from "next/image";
import "./about-YEOWOON.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { Karla, notoSansBlack, notoSansExtraBold } from "@/fonts";
import { aboutY } from "@/data/about/about";

const { aboutSilverUrl, repImgUrl, aySubtitle, ayRepScript } = aboutY;

gsap.registerPlugin(useGSAP, MotionPathPlugin);

const AboutYEOWOON = () => {
  // 대표님 사진 좌우 흰색 선 그려지는 svg 애니메이션
  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: {
        duration: 1.5,
        strokeDasharray: 0,
      },
    });

    function drawLine(target1: string, target2: string) {
      tl.set(`${target1}`, { opacity: 1 })
        .set(`${target2}`, { opacity: 1 })
        .from(`${target1}`, {
          motionPath: {
            path: `${target1}`,
            align: `${target1}`,
          },
        })
        .from(
          `${target2}`,
          {
            motionPath: {
              path: `${target2}`,
              align: `${target2}`,
            },
          },
          "<0.4"
        );
    }

    drawLine("#left_line_path", "#right_line_path");
  });

  return (
    <article className="ay_container">
      <header className="ay_title">
        {/* playsInline : ios에서 영상을 배경으로  */}
        <video loop muted autoPlay playsInline>
          <source src={aboutSilverUrl} type="video/mp4" />
        </video>
        <h4 className={notoSansBlack.className}>
          FIND YOUR STYLE WITH YEOWOON WHOEVER YOU ARE
        </h4>
      </header>
      <section className="ay_subtitle">
        <h2 className={notoSansExtraBold.className}>About YEOWOON</h2>
        <p className={Karla.className}>{aySubtitle}</p>
      </section>
      <section className="ay_content">
        <svg
          className="left_line"
          width="720"
          height="4"
          viewBox="0 0 720 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            id="left_line_path"
            d="M720 2H0"
            stroke="white"
            strokeWidth="4"
          />
        </svg>

        <section className="ay_rep">
          <Image
            src={repImgUrl}
            priority={true}
            width={250}
            height={310}
            style={{}}
            alt={"aboutRep"}
          />

          <figure className="ay_rep_script">
            <h4 className={notoSansExtraBold.className}>
              Jung
              <br /> Soonhee
            </h4>
            {ayRepScript.map((script, i) => {
              return <p key={i}>{script}</p>;
            })}
          </figure>
        </section>
        <svg
          className="right_line"
          width="721"
          height="5"
          viewBox="0 0 721 5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            id="right_line_path"
            d="M0.5 2.5H720.5"
            stroke="white"
            strokeWidth="4"
          />
        </svg>
      </section>
    </article>
  );
};

export default AboutYEOWOON;
