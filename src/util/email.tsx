import nodemailer from "nodemailer";

// 이메일 API 계정 설정
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NEXT_PUBLIC_EMAIL,
    pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
  },
  // Important for private subnet
  tls: {
    rejectUnauthorized: true, // Recommended for security
  },
});
// 메일전송 상태, 에러 메세지 전달 타입
export type SendMessageType = {
  message: string;
  status: number;
};
// 전송을 위한 정보 전달 타입
export type ContactType = {
  name: string;
  email: string;
  inquiry: string;
};
// 정보를 메일로 바꾸기위한 정보 타입
type MAilOptionType = {
  to: string;
  email: string;
  subject: string;
  html: string;
};

// 정보를 메일로 바꾸는 코드
export function sendEmail({ name, email, inquiry }: ContactType) {
  const mailOption: MAilOptionType = {
    to: process.env.NEXT_PUBLIC_EMAIL || "",
    email,
    subject: `[YEOWOON] Inquir from ${email}`,
    html: `
        <h3>Yeowoon Inquir from...</h3>
        </br>
        <div>성함: ${name}</div>
        <div>이메일 주소: ${email}</div>
        </br>
        <h3>문의 내용 </h3>
        <p>${inquiry}</p>`,
  };
  return transporter.sendMail(mailOption);
}
