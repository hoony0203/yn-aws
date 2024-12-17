import { createArtworkStore } from "@/store/artwork-store";
import { createArtworkModalStore } from "@/store/modal-store";
import { campImgType } from "@/types";

import Image from "next/image";

const CampaignImgItem = ({ imgProps }: { imgProps: campImgType }) => {
  const { id, ImgUrl, ImgLoadPriority, title } = imgProps;
  const { isArtworkModalOpen, setIsArtworkModalOpen } =
    createArtworkModalStore();
  const { setCampaignSelect } = createArtworkStore();
  return (
    <>
      {/* 
      이미지 클릭시 
      1) 아트워크 모달 열림 상태 변경 
      2) 선택된 캠페인 id로 해당 data를 store 저장함
      3) ImgLoadPriority 타입에 따라 priority bool값 변경 
        (priority는 bool 값만 지정가능함)
    */}
      <Image
        onClick={() => {
          setIsArtworkModalOpen(isArtworkModalOpen);
          setCampaignSelect(id);
        }}
        src={ImgUrl}
        alt={title}
        width={330}
        height={200}
        style={{}}
        priority={
          typeof ImgLoadPriority === "boolean" ? ImgLoadPriority : false
        }
      />
      <p>{imgProps.title}</p>
    </>
  );
};

export default CampaignImgItem;
