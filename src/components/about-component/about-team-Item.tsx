import Image from "next/image";
import "./about-team-item.scss";
import { aboutTeam } from "@/data/about/about";

const AboutTeamItem = () => {
  return (
    <section className="at_item_container">
      {aboutTeam.map(({ id, imgUrl, title, script }) => {
        return (
          <figure key={id}>
            <Image
              className={`aboutTeam_img ${id}`}
              priority
              src={imgUrl}
              style={{}}
              width={380}
              height={480}
              alt={`aboutTeam-img-${id}`}
            />
            <label className="at_content">
              <h3 className="notobold">{title}</h3>
              <p>{script}</p>
            </label>
          </figure>
        );
      })}
    </section>
  );
};

export default AboutTeamItem;
