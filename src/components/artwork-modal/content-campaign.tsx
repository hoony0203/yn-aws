import { createArtworkStore } from "@/store/artwork-store";
import Image from "next/image";
import "./content-campaign.scss";
import { useEffect, useState } from "react";

const CampaignContent = ({ ...item }) => {
  const { selectedCampaignData } = createArtworkStore();

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

  return (
    <>
      {item.isSecondPage === false ? (
        <>
          <figure className="camp_artwork_img">
            {width <= 480 ? (
              <>
                <div>
                  <Image
                    src={item.ImgUrl}
                    style={{}}
                    width={600}
                    height={400}
                    alt={`img-${item.subTitle}`}
                  />
                </div>
                <article className="camp_short_info">
                  <header>
                    <h2>{item.title}</h2>
                    <Image
                      src={item.logoImgUrl}
                      width={200}
                      height={200}
                      style={{}}
                      alt={"camp-stree-logo"}
                    />
                  </header>

                  <p>{item.scriptEng}</p>
                </article>
              </>
            ) : (
              item.Imgs.map((img: string, i: number) => {
                return (
                  <div className="camp_imgs" key={i}>
                    <Image
                      src={`${img}`}
                      style={{}}
                      width={600}
                      height={400}
                      alt={`img-${i}`}
                    />
                  </div>
                );
              })
            )}
          </figure>
        </>
      ) : (
        <>
          {item.video === "" ? null : (
            <>
              <video
                className="campaign_video"
                loop
                muted
                autoPlay
                playsInline>
                <source src={`${item.video}`} type="video/mp4" />
              </video>
            </>
          )}
          {width <= 480
            ? item.Imgs.map((img: string, i: number) => {
                return (
                  <div
                    className={`camp_imgs ${
                      item.isBigHeight === true ? "big_height" : ""
                    }`}
                    key={i}>
                    <Image
                      src={`${img}`}
                      style={{}}
                      width={600}
                      height={400}
                      alt={`img-${i}`}
                    />
                  </div>
                );
              })
            : null}
        </>
      )}
    </>
  );
};

export default CampaignContent;
