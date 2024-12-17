"use client";

import MenuModal from "@/components/headers menu-modal/menu-modal";
import "./page.scss";
import Exhibition from "@/components/archive-component/exhibition-component/archive-exhibition";
import { useEffect } from "react";
import { commonLenis } from "@/util/lenis";
import { notoSansBlack } from "@/fonts";

const Archive = () => {
  useEffect(() => {
    commonLenis();
  });

  return (
    <article className="exhibition">
      <h1 className={notoSansBlack.className}>EXHIBITION</h1>
      <Exhibition />
      <MenuModal />
    </article>
  );
};

export default Archive;
