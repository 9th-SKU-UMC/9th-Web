import { useContext, createContext, useState } from "react";
import { AddLPModal } from "../Components/Modal";

type ModalType = 'ADD_LP' | null;

interface ModalControllContextType {
    modalType: ModalType; // 현재 열려있는 모달 타입
    openModal: (type: Exclude<ModalType, null>) => void; // 모달 열기 함수(단, null은 제외)
    closeModal: () => void; // 모달 닫기 함수
}


export const ModalControllContext = createContext<ModalControllContextType | null>(null);

export const ModalControllProvider = ({ children }: { children: React.ReactNode }) => {
    const [modalType, setModalType] = useState<ModalType>(null);

    const openModal = (type: Exclude<ModalType, null>) => {
        setModalType(type);
    }

    const closeModal = () => {
        setModalType(null);
    }

    return (
        <>
        <ModalControllContext.Provider value={{ modalType, openModal, closeModal }}>
            {children}
        </ModalControllContext.Provider>
        </>
    )
}

export const useModalControll = () => {
    const context = useContext(ModalControllContext);
    if (!context) {
        throw new Error("useModalControll must be used within a ModalControllProvider");
    }
    return context;
}