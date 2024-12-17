"use client";

import Image from "next/image";
import "./content-artist.scss";
import { useEffect, useState } from "react";
import Link from "next/link";

const ArtistContent = ({ ...item }) => {
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
          <figure className="artist_artwork_img">
            <Image
              src={`${item.ImgUrl}`}
              width={500}
              height={500}
              style={{}}
              alt={item.artist}
            />
          </figure>
          <label className="artwork_script karlaBold">
            {width <= 1080 ? (
              <article className="artist_short_info">
                <h2>{item.artist}</h2>
                <Image
                  src={`${item.nation}`}
                  width={200}
                  height={200}
                  alt={"nation"}
                  style={{}}
                />
                <label className="insta_container">
                  {item.Instagram.map((insta: string, i: number) => {
                    return (
                      <Link
                        key={i}
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`http://instagram.com/${item.Instagram}`}>
                        <span>@{insta}</span>
                      </Link>
                    );
                  })}
                </label>
              </article>
            ) : null}

            <p>{item.scriptEng}</p>
          </label>
        </>
      ) : item.video === "" ? (
        <div className="artist_imgs">
          {item.Imgs.map((img: string, i: number) => {
            return (
              <div key={i}>
                <Image
                  src={`${img}`}
                  alt={`${item.artist}-${i}`}
                  width={500}
                  height={500}
                  style={{}}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <>
          {item.video.map((v: string, i: number) => {
            return (
              <video
                className="artist_video"
                key={i}
                loop
                muted
                autoPlay
                playsInline>
                <source src={`${v}`} type="video/mp4" />
              </video>
            );
          })}
        </>
      )}
    </>
  );
};

export default ArtistContent;
