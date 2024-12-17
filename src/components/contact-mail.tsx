import { ContactType } from "@/util/email";
// 메세지 전송 API 전달 역할
export async function SandContactEmail(emailFrom : ContactType) {
    const response = await fetch('/contact/api', {
        method: 'POST',
        body : JSON.stringify(emailFrom),
        headers:{
            'Content-Type' : 'application/json',
        }
    })
    const data = await response.json();
    
    if(!response.ok){   
        throw new Error(data.message || "Server request failed");
    }

    return {message : data.message, status : data.status};
}