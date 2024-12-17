"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faWhatsapp,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./page.scss";
import { useState } from "react";
import { SandContactEmail } from "@/components/contact-mail";
import MenuModal from "@/components/headers menu-modal/menu-modal";
import { SondMailChack } from "@/components/contact-check";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/dist/TextPlugin";
import { SendMessageType } from "@/util/email";
import { notoSansBlack, notoSansExtraBold } from "@/fonts";
import Link from "next/link";

gsap.registerPlugin(TextPlugin);
const Contact = () => {
  // 1. 인풋 내용 감지 , (2,3). 메일전송메세지 출력칸 감지
  const [contact, setcontact] = useState({
    name: "",
    email: "",
    inquiry: "",
  });
  const [submitMessage1, setSubmitMessage1] = useState("");
  const [submitMessage2, setSubmitMessage2] = useState("");
  const onchange = (e: any) => {
    setcontact({ ...contact, [e.target.name]: e.target.value });
  };
  // 메일 전송 메세지를 2공간에 번갈아가며 표시
  const setSubmitMessage = (message: string) => {
    if (submitMessage1 === "" && submitMessage2 === "") {
      setSubmitMessage1(message);
    } else if (submitMessage1 !== "") {
      setSubmitMessage2(message);
      setSubmitMessage1("");
    } else {
      setSubmitMessage1(message);
      setSubmitMessage2("");
    }
  };
  // 메일 전송 코드
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const elements =
      document.querySelectorAll<HTMLElement>(".submit_message");
    e.preventDefault();
    const sandchack = SondMailChack(contact); // 클라우드단 유효성검사
    if (sandchack[1] === false) {
      // 유효성검사 실패시 오류메세지 출력
      setSubmitMessage(sandchack[0] as string);
      document.getElementById(`${sandchack[2]}`)?.focus();
      elements.forEach((message) => {
        message.style.color = "rgb(255,204,102)";
      });
    } else {
      // 유효성검사 성공시 전송중 메세지 출력
      gsap.defaults({ ease: "none" });
      const roding = gsap.timeline({
        repeat: 3,
        repeatDelay: 0.5,
        yoyo: true,
      });
      setSubmitMessage("Sending your message.");
      // 점이 늘어나는 GSAP 애니메이션 재생
      roding.to(".submit_message p span", { duration: 1, text: " . ." });
      const data = SandContactEmail({ ...contact });
      setcontact({ name: "", email: "", inquiry: "" });
      data.then((result: SendMessageType) => {
        if (result.status === 500) {
          // 서버문제로 전송 실패시 에러메세지 출력
          elements.forEach((message) => {
            message.style.color = "rgb(255,204,102)";
          });
        } else {
          // 문제 없을경우 기본 텍스트 색상으로변경
          elements.forEach((message) => {
            message.style.color = "white";
          });
        }
        // 전송 완료 메세지 출력
        setSubmitMessage(result.message);
        roding.kill();
        gsap.set(".submit_message p span", { text: "" });
      });
    }

    // 메일 전송 메세지공간 2개가 번갈아가면서 보이게하는 애니메이션 코드
    const tl = gsap.timeline();
    if (submitMessage1 === "") {
      tl.fromTo(
        "#sm1",
        {
          rotateX: -90,
          opacity: 0,
          height: 0,
          y: 10,
        },
        {
          rotateX: 0,
          opacity: 1,
          duration: 0.5,
          height: 38,
          y: 0,
        }
      ).to(
        "#sm2",
        {
          y: -10,
          rotateX: 90,
          opacity: 0,
          height: 0,
          duration: 0.5,
        },
        "<"
      );
    } else if (submitMessage1 !== "") {
      tl.to("#sm1", {
        y: -10,
        rotateX: 90,
        opacity: 0,
        height: 0,
        duration: 0.5,
      }).fromTo(
        "#sm2",
        {
          rotateX: -90,
          opacity: 0,
          height: 0,
          y: 10,
        },
        {
          rotateX: 0,
          opacity: 1,
          duration: 0.5,
          height: 38,
          y: 0,
        },
        "<"
      );
    }
  };
  const welcomeMessage =
    "Hello, This is the WhatsApp contact for STREE or Soonhee or Yeowoon. Please feel free to reach us no matter when. Find your style whoever you are with us.";

  return (
    <div className="contact">
      <MenuModal />
      <section>
        <figure className="contact_Us">
          <h1 className={notoSansExtraBold.className}>Contact us</h1>
          <form className="sandMail" method="post" onSubmit={onSubmit}>
            <div>
              <input
                id="name"
                name="name"
                placeholder="Name"
                onChange={onchange}
                value={contact.name}
                autoComplete="off"></input>
              <input
                id="email"
                name="email"
                placeholder="Email"
                onChange={onchange}
                value={contact.email}
                autoComplete="off"></input>
              <textarea
                id="inquiry"
                name="inquiry"
                rows={1}
                placeholder="Inquiry"
                onChange={onchange}
                value={contact.inquiry}
                autoComplete="off"></textarea>
            </div>
            <button>
              <p className="notoblack">SUBMIT</p>
            </button>
          </form>
          <p className="submit_message" id="sm1">
            {submitMessage1}
            <span></span>
          </p>
          <p className="submit_message" id="sm2">
            {submitMessage2}
            <span></span>
          </p>
        </figure>
      </section>
      <section className="contact_link">
        <div>
          <Link
            href="mailto:yeowoon@yeowoon.co.kr"
            className="mailIcon"
            target="_blank"
            rel="noopener noreferrer">
            <FontAwesomeIcon icon={faEnvelope} size="6x" />
          </Link>
          <Link
            href="mailto:yeowoon@yeowoon.co.kr"
            target="_blank"
            rel="noopener noreferrer">
            <b className="notoExbold">yeowoon@yeowoon.co.kr</b>
          </Link>
        </div>
        <figure className="links">
          <div>
            <Link
              href="https://www.linkedin.com/in/soonhee-jung-the-yeowoon/"
              className="icon"
              target="_blank"
              rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} size="4x" />
            </Link>
            <b className={`${notoSansBlack.className}`}>
              <Link
                href="https://www.linkedin.com/in/soonhee-jung-the-yeowoon/"
                target="_blank"
                rel="noopener noreferrer">
                LinkedIn
              </Link>
            </b>
            <Link
              href="https://www.linkedin.com/in/soonhee-jung-the-yeowoon/"
              target="_blank"
              rel="noopener noreferrer">
              Jung Soonhee
            </Link>
          </div>
          <div>
            <Link
              href={`https://api.whatsapp.com/send?phone=821095734680&text=${welcomeMessage}`}
              className="icon"
              target="_blank"
              rel="noopener noreferrer">
              <FontAwesomeIcon icon={faWhatsapp} size="4x" />
            </Link>
            <b className={`${notoSansBlack.className}`}>
              <Link
                href={`https://api.whatsapp.com/send?phone=821095734680&text=${welcomeMessage}`}
                target="_blank"
                rel="noopener noreferrer">
                WhatsApp
              </Link>
            </b>
            <Link
              href={`https://api.whatsapp.com/send?phone=821095734680&text=${welcomeMessage}`}
              target="_blank"
              rel="noopener noreferrer">
              +8210-9513-4680
            </Link>
          </div>
          <div>
            <Link
              href="https://www.instagram.com/s.tree_official/"
              className="icon"
              target="_blank"
              rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} size="4x" />
            </Link>
            <b className={`${notoSansBlack.className}`}>
              <Link
                href="https://www.instagram.com/s.tree_official/"
                target="_blank"
                rel="noopener noreferrer">
                Instagram
              </Link>
            </b>
            <Link
              href="https://www.instagram.com/s.tree_official/"
              target="_blank"
              rel="noopener noreferrer">
              @s.tree_offcial
            </Link>
            <Link
              href="https://www.instagram.com/soonhee_official/"
              target="_blank"
              rel="noopener noreferrer">
              @soonhee_offcial
            </Link>
          </div>
        </figure>
      </section>
    </div>
  );
};

export default Contact;
