"use client";

import { useEffect, useRef } from "react";
import "./artwork-modal.scss";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { createArtworkModalStore } from "@/store/modal-store";
import ArtDefaultSection from "./art-default-section";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, A11y } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { createArtworkStore } from "@/store/artwork-store";
import { useGSAP } from "@gsap/react";

const ArtworkModal = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const { isSecondPage } = createArtworkStore();

  const { isArtworkModalOpen, setIsArtworkModalOpen } =
    createArtworkModalStore();

  const { isModalTypeArtist, selectedArtistData, selectedCampaignData } =
    createArtworkStore();

  gsap.registerPlugin(gsap);
  // 모달 온오프시 body에 스크롤 록 클래스 온오프 설정
  useGSAP(() => {
    if (isArtworkModalOpen === true) {
      document.body.classList.add("locked");
    } else {
      document.body.classList.remove("locked");
    }
  }, [isArtworkModalOpen]);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    } else if (dialogRef.current?.open === true) {
      dialogRef.current?.close();
    }
  });

  if (!isArtworkModalOpen) return null;
  return createPortal(
    <dialog
      className="art_modal_dialog"
      ref={dialogRef}
      onClose={() => setIsArtworkModalOpen(false)}>
      {isModalTypeArtist === false ? (
        <SwiperModal isSecondPage={isSecondPage} />
      ) : selectedArtistData[0].hasSeries === true ? (
        <SwiperModal isSecondPage={isSecondPage} />
      ) : (
        <ArtDefaultSection isSecondPage={false} />
      )}
    </dialog>,
    document.getElementById("artworkPortal") as HTMLElement
  );
};

const SwiperModal = ({ isSecondPage }: { isSecondPage: boolean }) => {
  return (
    <>
      <Swiper
        className="art_swiper"
        modules={[Pagination, Autoplay, A11y]}
        pagination={{
          clickable: true,
        }}>
        <SwiperSlide>
          <ArtDefaultSection isSecondPage={false} />
        </SwiperSlide>
        <SwiperSlide>
          <ArtDefaultSection isSecondPage={isSecondPage} />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default ArtworkModal;
