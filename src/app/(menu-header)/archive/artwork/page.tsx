"use client";

import "./page.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";
import { notoSansBlack } from "@/fonts";
import MenuModal from "@/components/headers menu-modal/menu-modal";
import ArtworkModal from "@/components/artwork-modal/artwork-modal";
import { campaignData } from "@/data/artwork/campaign";
import { artistData } from "@/data/artwork/artist";
import { artistImgType, campImgType } from "@/types";
import CampaignImgItem from "@/components/archive-component/artwork-component/campaign-img-Item";
import ArtistImgItem from "@/components/archive-component/artwork-component/artist-img-Item";
import { createArtworkModalStore } from "@/store/modal-store";

const Artwork = () => {
  /* 타임라인 제어를 위한 useRef 사용 */
  const campTlRef = useRef<GSAPTimeline>();
  const artistTlRef = useRef<GSAPTimeline>();
  const { isArtworkModalOpen } = createArtworkModalStore();
  gsap.registerPlugin(gsap);
  const { toArray } = gsap.utils;
  useEffect(() => {
    if (typeof document !== "undefined") {
      const camptl = toArray(".camp.img_item");
      const artistTl = toArray(".artist.img_item");
      const imgArray = [camptl, artistTl];

      const handleMouseEnterCamp = () => {
        campTlRef.current?.pause();
      };

      const handleMouseLeaveCamp = () => {
        campTlRef.current?.resume();
      };

      const handleMouseEnterArtist = () => {
        artistTlRef.current?.pause();
      };

      const handleMouseLeaveArtist = () => {
        artistTlRef.current?.resume();
      };
      const entereventlist = [
        handleMouseEnterCamp,
        handleMouseEnterArtist,
      ];
      const leaveeventlist = [
        handleMouseLeaveCamp,
        handleMouseLeaveArtist,
      ];

      if (isArtworkModalOpen) {
        // 모달이 열렸을 때 애니메이션 정지
        campTlRef.current?.pause();
        artistTlRef.current?.pause();
      } else {
        // 모달이 닫혔을 때 애니메이션 재개 및 리스너 설정
        campTlRef.current?.resume();
        artistTlRef.current?.resume();
        imgArray.map((array, i) => {
          array.map((item: any) => {
            item?.addEventListener("mouseenter", entereventlist[i]);
            item?.addEventListener("mouseleave", leaveeventlist[i]);
          });
        });
      }

      // 컴포넌트 언마운트 또는 isArtworkModalOpen 변경 시 리스너 정리
      return () => {
        imgArray.map((array, i) => {
          array.map((item: any) => {
            item?.removeEventListener(
              "mouseenter",
              entereventlist[i]
            );
            item?.removeEventListener(
              "mouseleave",
              leaveeventlist[i]
            );
          });
        });
      };
    }
  }, [isArtworkModalOpen, toArray]);

  useGSAP(() => {
    /*
    객체 배열로 campaing / artist 별 다른 트윈 정보 할당
    matchMedia 조건 만족시 map으로 각 트윈 생성
    각 열은 좌측 / 우측으로 xPercent 만큼 밀려나 끝에서 나타남
    */
    let lines = [
      {
        container: toArray(".camp.item_container"),
        xPercent: -45,
        items: toArray(".camp.img_item"),
        tl: campTlRef,
        tlParam: { speed: 25, duration: 30, repeatDelay: -14 },
      },
      {
        container: toArray(".artist.item_container"),
        xPercent: 45,
        items: toArray(".artist.img_item"),
        tl: artistTlRef,
        tlParam: { speed: -30, duration: 40, repeatDelay: -18 },
      },
    ];

    let horizonDefaults = {
      defaults: {
        ease: "none",
        repeat: -1,
      },
    };

    let mm = gsap.matchMedia(), //gsap matchMedia (반응형) 설정
      breakPoint = 1081;

    mm.add(
      {
        isDesktop: `(min-width: ${breakPoint}px)`,
      },
      (context) => {
        /* && 이후로 gsap matchMedia (반응형) 설정 끝
        1080 이하로 애니메이션 동작하지 않음.
        1081 이상 애니메이션 동작
        - 윗줄 : 좌에서 우 / 아랫줄 : 우에서 좌로 교차하며 무한반복
        */
        context.conditions?.isDesktop &&
          lines.map(
            ({
              container,
              xPercent,
              items,
              tl,
              tlParam: { speed, duration, repeatDelay },
            }) => {
              tl.current = gsap
                .timeline(horizonDefaults)
                .set(container, { xPercent: xPercent })
                .to(items, {
                  // this._targets[0] - 각 열의 너비만큼 곱함
                  x() {
                    return this._targets[0].offsetWidth * speed;
                  },
                  duration,
                  repeatDelay,
                });
            }
          );
      }
    );
  });

  return (
    <section className="artwork_container">
      <h1 className={notoSansBlack.className}>ART WORK</h1>
      <main className="artwork_grid">
        {/*아트워크 그리드는 campaign, artist 두 줄로 분류. 1080 초과에서 가로 두 줄, 1080 이하에서 세로 두 줄로 배열*/}
        <article className="camp item_container" id="camp">
          {campaignData.map(
            ({ id, ImgUrl, ImgLoadPriority, title }) => {
              const imgProps: campImgType = {
                id,
                ImgUrl,
                ImgLoadPriority,
                title,
              };
              return (
                <div key={id} className="camp img_item">
                  <CampaignImgItem imgProps={imgProps} />
                </div>
              );
            }
          )}
        </article>
        {/*campaign end*/}
        <article className="artist item_container" id="artist">
          {artistData.map(({ id, ImgUrl, artist }) => {
            const imgProps: artistImgType = {
              id,
              ImgUrl,
              artist,
            };
            return (
              <div key={id} className="artist img_item">
                <ArtistImgItem imgProps={imgProps} />
              </div>
            );
          })}
        </article>
        {/*artist end*/}
      </main>
      <MenuModal />
      <ArtworkModal />
      {/*아트워크 모달 컴포넌트를 선언해야 표시할 수 있음*/}
    </section>
  );
};

export default Artwork;
