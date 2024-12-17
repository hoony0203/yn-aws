import { exhibition } from "@/data/artwork/exhibition";
import Image from "next/image";
import "./archive-exhibition.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { notoSansBlack } from "@/fonts";

const Exhibition = () => {
  const master = gsap.timeline();
  useGSAP(() => {
    gsap.registerPlugin(useGSAP, ScrollToPlugin, ScrollTrigger);
    function dropbooks(targets: string) {
      const handleResize = () => {
        const elements = gsap.utils
          .toArray(`${targets}`)
          .reverse()
          .slice(0, -1);
        // 태블릿 이상에서 사용되는 책 떨어지는 애니메이션
        if (window.innerWidth > 768) {
          const drop = gsap.timeline({
            defaults: {
              ease: "none",
              stagger: { amount: 1 },
            },
          });
          drop
            .to(window, { scrollTo: { y: "max" } })
            .fromTo(
              elements,
              {
                y: -500,
                opacity: 0,
                rotate: 15,
                x: function (i) {
                  return i % 2 === 1 ? 60 : -60;
                },
                rotateY: function (i) {
                  return i % 2 === 1 ? 1.5 : -1.5;
                },
              },
              {
                duration: 0.2,
                y: -120,
                opacity: 1,
                rotate: 15,
              }
            )

            .to(elements, { duration: 0.3, rotate: -3, y: 0 }, "<0.2")
            .to(elements, { duration: 0.2, rotate: 1 }, "<0.2")
            .to(elements, { duration: 0.2, rotate: 0 }, "<0.2")
            .to(window, { duration: 0.8, scrollTo: { y: "min" } }, "<0.1")
            .fromTo(
              ".JGTDubai2024",
              { rotateY: 0, rotateX: 65 },
              { duration: 0.3, rotateX: 0, opacity: 1 }
            );

          master.add(drop);

          master.play();
        }
      };

      handleResize();
    }

    // 중간에 메뉴버튼 누를시 애니메이션을 강제로 끝내버리는 코드
    dropbooks(".book");
    const skip = () => {
      master.progress(1);
    };

    const skipbutton = document.getElementById("barButton");
    skipbutton?.addEventListener("click", skip);
  });

  return (
    <section className={`exhibition_books ${notoSansBlack.className}`}>
      {exhibition.map(({ id, title, imgUrl, imgUrlMobile }) => {
        return (
          <figure key={id} className={`${id} book`}>
            <p>{title}</p>
            <Image
              className={`${id}pc`}
              src={imgUrl}
              style={{}}
              alt={"EXHIBITION"}
              width={600}
              height={80}
              priority
            />
            {imgUrlMobile ? <Image
              className={`${id}mobile`}
              src={imgUrlMobile}
              style={{}}
              alt={"EXHIBITION"}
              width={600}
              height={80}
              priority
            /> : null }
          </figure>
        );
      })}
    </section>
  );
};

export default Exhibition;
