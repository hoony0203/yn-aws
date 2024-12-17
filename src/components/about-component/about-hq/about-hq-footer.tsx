"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const AboutHqFooter = () => {
  const pathname = usePathname().replace("/", "");

  /*
  with useState 부터 useEffect까지
  : 리사이즈 감지하여 너비 상태값 지정
  */

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

  // 리사이즈 감지, 너비 지정 end

  return (
    <footer className="ahq_footer">
      <Image
        className={`footer_silver ${
          pathname === "about"
            ? "about_noSilver"
            : width > 1080
            ? "no_mobile"
            : ""
        }`}
        src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/img/about/footerSilver.png`}
        width={390}
        height={850}
        style={{}}
        alt={"footerSilver"}
      />

      {/* 
        1) 메인 페이지의 about 컴포넌트일 때
        1080초과면 배경 없는 기본 푸터
        1080이하면 배경 있는 모바일 푸터
        2) about 페이지의 컴포넌트일 때
        기본 푸터 유지
        */}

      {pathname !== "about" && width > 1080 && <DefaultAhqFooter />}

      {pathname !== "about" && width <= 1080 ? (
        <MobileMainAhqFooter />
      ) : (
        pathname === "about" && <DefaultAhqFooter />
      )}
    </footer>
  );
};

const DefaultAhqFooter = () => {
  return (
    <>
      <p>View more stories</p>
      <Link href={"/archive/artwork"}>
        <p>Go to Archive</p>
      </Link>
      <svg
        width="120"
        height="16"
        viewBox="0 0 195 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M194.707 8.70711C195.098 8.31658 195.098 7.68342 194.707 7.29289L188.343 0.928932C187.953 0.538408 187.319 0.538408 186.929 0.928932C186.538 1.31946 186.538 1.95262 186.929 2.34315L192.586 8L186.929 13.6569C186.538 14.0474 186.538 14.6805 186.929 15.0711C187.319 15.4616 187.953 15.4616 188.343 15.0711L194.707 8.70711ZM0 9H194V7H0V9Z"
          fill="white"
        />
      </svg>
    </>
  );
};

const MobileMainAhqFooter = () => {
  return (
    <article className="silver_article">
      <p>FIND YOUR JEWELRY NO MATTER YOU ARE</p>
      <Link href={"/brand"}>
        <p>WITH US</p>
      </Link>
      <svg
        width="120"
        height="16"
        viewBox="0 0 195 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M194.707 8.70711C195.098 8.31658 195.098 7.68342 194.707 7.29289L188.343 0.928932C187.953 0.538408 187.319 0.538408 186.929 0.928932C186.538 1.31946 186.538 1.95262 186.929 2.34315L192.586 8L186.929 13.6569C186.538 14.0474 186.538 14.6805 186.929 15.0711C187.319 15.4616 187.953 15.4616 188.343 15.0711L194.707 8.70711ZM0 9H194V7H0V9Z"
          fill="white"
        />
      </svg>
    </article>
  );
};

export default AboutHqFooter;
