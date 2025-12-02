import { create } from "zustand";

type ModalState = {
    isOpen: boolean;
}

type ModalActions = {
    openModal: (isOpen: ModalState['isOpen']) => void;
    closeModal: (isOpen: ModalState['isOpen']) => void;
}

const useModalStore = create<ModalState & ModalActions>((set) => ({
    isOpen: false,
    openModal: () => set(() => ({ isOpen: true })),
    closeModal: () => set(() => ({ isOpen: false })),
}))

export default useModalStore;

