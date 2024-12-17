import Link from "next/link";
import "./main-floating-bar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";

const MainFloatingBar = () => {
  return (
    <div className="main_floating_bar">
      <div className="link">
        <Link
          href={"https://www.linkedin.com/in/soonhee-jung-the-yeowoon/"} 
          className="icon" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedin} size="4x" />
        </Link>
      </div>
    </div>
  );
};

export default MainFloatingBar;
