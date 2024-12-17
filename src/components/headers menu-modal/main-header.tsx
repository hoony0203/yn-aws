"use client";

import Link from "next/link";
import "./main-header.scss";
import { usePathname } from "next/navigation";
import { archiveSubMenu, headerMenu } from "@/data/data";
import { createModalStore } from "@/store/modal-store";
import { useState } from "react";
import { notoSansBlack } from "@/fonts";

const MainHeader = () => {
  const pathname = usePathname().replace("/", "");
  const { setIsModalOpen } = createModalStore();
  const [active_sub, setActive_sub] = useState(false);

  return (
    <header className={`header ${notoSansBlack.className}`}>
      <div className="bar_container">
        <svg
          onClick={() => setIsModalOpen(true)}
          className="bar_Btn"
          width="42"
          height="32"
          viewBox="0 0 42 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <g id="barButton">
            <path id="bar1" d="M0 2H42" stroke="white" strokeWidth="3" />
            <path id="bar2" d="M0 16H42" stroke="white" strokeWidth="3" />
            <path id="bar3" d="M0 30H42" stroke="white" strokeWidth="3" />
          </g>
        </svg>
      </div>
      <nav>
        <ul>
          {headerMenu.map((link, i) => {
            const isActive = pathname === link;
            return link === "archive" ? (
              <li
                onMouseEnter={() => setActive_sub(true)}
                onMouseLeave={() => setActive_sub(false)}
                key={i}>
                <Link
                  className={isActive ? "active_link" : "link"}
                  href={`/${link}/artwork`}>
                  {link}
                </Link>
                <ul
                  className={`archive_sub ${
                    active_sub ? "subActive" : ""
                  }`}>
                  {archiveSubMenu.map((sub, i) => {
                    return (
                      <li key={i}>
                        <Link href={`/${link}/${sub}`}>{sub}</Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ) : (
              <li key={i}>
                <Link
                  className={isActive ? "active_link" : "link"}
                  href={`/${link}`}>
                  {link}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
