import { ContactType } from "@/util/email";

// 메세지 전송 유효성검사
export const SondMailChack = (contact : ContactType) => {
    var subimtMessage : string = "" 
    const message = ["name","email","inquiry"]
    const pattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
    for (let i=0; i<Object.values(contact).length;i++)
        if ([undefined,""].includes(Object(contact)[message[i]])){
            subimtMessage = `Please enter ${message[i]}`
            return [subimtMessage,false,message[i]]
        }
     if (pattern.test(contact.email) === false){
        subimtMessage = "This is an invalid email."
        return [subimtMessage,false,"email"]
    }
       

    return ["Sand Mailing",true]
}