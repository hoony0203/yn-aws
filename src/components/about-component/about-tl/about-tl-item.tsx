import { tlScript } from "@/data/about/aboutTl";
import Script from "@/components/script-component";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { notoSansBold } from "@/fonts";

const AboutTlItem = () => {
  gsap.registerPlugin(gsap, ScrollTrigger);

  return (
    <section id="atl_attends" className="atl_attends">
      {tlScript.map(({ year, attends }, i) => {
        return (
          <figure className="atl_attend_item" key={i} id={`year${i}`}>
            <h3 className={notoSansBold.className}>{year}</h3>
            {attends.map((item, i) => {
              return (
                <label key={i}>
                  <p>
                    <Script param={item} />
                  </p>
                </label>
              );
            })}
          </figure>
        );
      })}
    </section>
  );
};

export default AboutTlItem;
