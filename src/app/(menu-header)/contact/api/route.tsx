import { sendEmail } from "@/util/email";
import { redirect } from "next/navigation";
import { ContactType } from "@/util/email";
import { SondMailChack } from "@/components/contact-check";

export async function POST(req: Request) {
  const body = (await req.json()) as ContactType;
  try {
    // 입력한 정보가 3가지가 아니면 잘못된 요청으로 메일전송 실패
    if (Object.keys(body).length != 3) {
      return new Response(
        JSON.stringify({
          message: "Failed to send message - Condition not met",
          status: 500,
        }),
        {
          status: 500,
        }
      );
    }
    const sandchack = SondMailChack(body); // 서버단 유효성 검사
    // 유효성 검사에 걸리면 문제 지적돠 메일전송 실패
    if (sandchack[1] === false) {
      return new Response(
        JSON.stringify({ message: `${sandchack[0]}`, status: 500 }),
        {
          status: 500,
        }
      );
    } else {
      // 문제없으면 메일을 전송하고 메일 전송 성공 메세지 출력
      await sendEmail(body);
      return new Response(
        JSON.stringify({ message: "We’ll be in touch soon", status: 200 }),
        {
          status: 200,
        }
      );
    }
  } catch (error) {
    console.log(error);
    // 서버 문제로 인한 전송 실패시 실패코드와 서버 콘솔에 오류 메세지 출력
    return new Response(
      JSON.stringify({
        message: "Failed to send message - Server error",
        status: 500,
      }),
      {
        status: 500,
      }
    );
  }
}
export async function GET(req: Request) {
  redirect(`/contact`);
}
