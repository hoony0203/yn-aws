import { brand } from "@/data/data";
import Image from "next/image";
import "./page.scss";
import MenuModal from "@/components/headers menu-modal/menu-modal";
import { KarlaExtraBold, KarlaBold } from "@/fonts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Brand = () => {
  return (
    <article className={`brand ${KarlaExtraBold.className}`}>
      {brand.map((item) => {
        return (
          <section key={item.id} className="brand_container">
            <figure className="brand_img">
              <Image
                className={item.id}
                src={item.imgUrl}
                alt={item.id}
                width={1080}
                height={1720}
                priority
              />
              <div>
                <Image
                  src={item.logo}
                  alt={item.id}
                  width={400}
                  height={160}
                  priority
                />
              </div>
            </figure>
            <figure className="brand_link">
              <nav className={KarlaBold.className}>
                <Link
                  href={item.instagram}
                  target="_blank"
                  rel="noopener noreferrer">
                  INSTA&nbsp;
                  <FontAwesomeIcon
                    className="linkIcon"
                    icon={faAngleRight}
                    size="2xs"
                  />
                </Link>
                <Link
                  href={item.webpage}
                  target="_blank"
                  rel="noopener noreferrer">
                  SHOP&nbsp;
                  <FontAwesomeIcon
                    className="linkIcon"
                    icon={faAngleRight}
                    size="2xs"
                  />
                </Link>
              </nav>
            </figure>
          </section>
        );
      })}
      <MenuModal />
    </article>
  );
};

export default Brand;
