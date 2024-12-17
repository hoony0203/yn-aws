import { create } from "zustand";

interface StateType {
  isModalOpen: boolean;
  setIsModalOpen: (param: boolean) => void;
}

export const createModalStore = create<StateType>((set) => ({
  isModalOpen: false,
  setIsModalOpen: (param: boolean) => set({ isModalOpen: param }),
}));

interface ArtworkStateType {
  isArtworkModalOpen: boolean;
  setIsArtworkModalOpen: (isArtworkModalOpen: boolean) => void;
}

export const createArtworkModalStore = create<ArtworkStateType>((set) => ({
  isArtworkModalOpen: false,
  setIsArtworkModalOpen: (isArtworkModalOpen: boolean) => {
    set({ isArtworkModalOpen: !isArtworkModalOpen });
  },
}));
