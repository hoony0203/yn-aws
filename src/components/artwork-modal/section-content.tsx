import { createArtworkStore } from "@/store/artwork-store";
import { createArtworkModalStore } from "@/store/modal-store";
import React from "react";
import ArtDefaultAside from "./art-default-aside";
import CampaignContent from "./content-campaign";
import ArtistContent from "./content-artist";

const SectionContent = ({ ...item }) => {
  const { isArtworkModalOpen, setIsArtworkModalOpen } =
    createArtworkModalStore();
  const { isModalTypeArtist } = createArtworkStore();

  let props;
  if (isModalTypeArtist === false) {
    const logoImgUrl = `${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/img/streeLogo.svg`;
    props = { logoImgUrl, ...item };
  }
  return (
    <>
      <header className="art_modal_header">
        <h2>
          {isModalTypeArtist === false
            ? item.title
            : `${item.artist}& S.tree`}{" "}
          &nbsp;
          <span>Collaboration</span>
        </h2>
        <div className="art_modal_close_Btn">
          <button
            onClick={() => {
              setIsArtworkModalOpen(isArtworkModalOpen);
            }}>
            <svg
              className="art_closeBtn"
              width="36"
              height="36"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                id="X-closeBtn"
                d="M2 2L24.5 24M24.5 2L2 24"
                stroke="black"
                strokeWidth="3"
              />
            </svg>
          </button>
        </div>
      </header>
      {item.isSecondPage === true &&
      isModalTypeArtist === false ? null : isModalTypeArtist === true ? (
        <ArtDefaultAside {...item} />
      ) : (
        <ArtDefaultAside {...props} />
      )}

      <article
        className={`art_modal_article ${
          isModalTypeArtist === false && item.isSecondPage === true
            ? `no_aside`
            : ""
        }`}>
        <div className="article_header">
          <h4>{item.subTitle}</h4>
        </div>
        <div
          className={`article_content ${
            isModalTypeArtist === true && item.isSecondPage === false
              ? `vertical_half`
              : item.video !== "" && item.isSecondPage === true
              ? `video`
              : ""
          }`}>
          {isModalTypeArtist === false ? (
            <CampaignContent {...props} />
          ) : (
            <ArtistContent {...item} />
          )}
        </div>
      </article>
      {item.hasSeries === true && (
        <footer className="art_modal_footer"></footer>
      )}
    </>
  );
};

export default SectionContent;
