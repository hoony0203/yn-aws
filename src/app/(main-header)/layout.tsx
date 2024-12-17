import "../globals.scss";
import "./layout.scss";
import { ReactNode } from "react";
import MainHeader from "@/components/headers menu-modal/main-header";
import { Metadata } from "next";
import Script from "next/script";
import { notoSans } from "@/fonts";

export const metadata: Metadata = {
  /*
  Metadata 
  - 멀티 layout 적용시 layout마다 필요함
  meatadataBase : 서비스시 도메인 기준으로 설정 (로컬 X)
  canonical 지정 : 페이지 리뉴얼시 우선수집
  파비콘 : 48(48 96 144) 배수로 지정 (구글, 네이버 기준)
  */
  metadataBase: new URL("https://www.yeowoon.co.kr/"),
  alternates: {
    canonical: "/",
  },
  title: "YEOWOON | 더여운",
  description:
    "더여운 We create jewerly that lasts a long time, like a yeowoon, a feeling people can look back on for as long as they want",
  verification: {
    google: "",
    other: {
      "naver-site-verification":
        "9f0c7024c0d45b2bce2a98a3520ff41794216ea1",
    },
  },
  icons: {
    icon: "/favicon-96x96.png",
  },
  openGraph: {
    title: "YEOWOON | 더여운",
    description:
      "더여운 We create jewerly that lasts a long time, like a yeowoon, a feeling people can look back on for as long as they want",
    images: ["/ogThumbnail.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="kr" className={`${notoSans.className} `}>
      <body>
        <div className="container">
          <MainHeader />
          <main className="main">{children}</main>
        </div>
        <div id="portal" />
      </body>
      <Script
        src="https://cdn.jsdelivr.net/gh/nuxodin/dialog-polyfill@1.4.2/dialog.min.js"
        strategy="afterInteractive"
      />
    </html>
  );
}
