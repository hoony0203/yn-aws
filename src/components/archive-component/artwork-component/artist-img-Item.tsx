import { createArtworkStore } from "@/store/artwork-store";
import { createArtworkModalStore } from "@/store/modal-store";
import { artistImgType } from "@/types";
import Image from "next/image";

const ArtistImgItem = ({ imgProps }: { imgProps: artistImgType }) => {
  const { id, ImgUrl, artist } = imgProps;
  const { isArtworkModalOpen, setIsArtworkModalOpen } =
    createArtworkModalStore();
  const { setArtistSelect } = createArtworkStore();

  return (
    <>
      {/* 
      이미지 클릭시 
      1) 아트워크 모달 열림 상태 변경 
      2) 선택된 아티스트 id로 해당 data를 store 저장함      
    */}
      <Image
        onClick={() => {
          setIsArtworkModalOpen(isArtworkModalOpen);
          setArtistSelect(id);
        }}
        src={ImgUrl}
        alt={artist}
        width={330}
        height={200}
        style={{}}
      />
      <p>{artist} X S.tree </p>
    </>
  );
};

export default ArtistImgItem;
