import React, { useEffect } from "react";
import { useModalControll } from "../../Hooks/ModalControllProvider";
import AddLPModal from "./AddLPModal";

const ModalShell = () => {
    const { modalType, closeModal } = useModalControll();

    // ESC 키로 모달 닫기
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape" && modalType !== null) {
                closeModal();
            }
        }

        window.addEventListener("keydown", handleEsc);

        return () => {
            window.removeEventListener("keydown", handleEsc);
        };
    }, [modalType, closeModal]);

    // 모달이 닫혀있으면 아무것도 렌더링하지 않음
    if (modalType === null) {
        return null;
    }

    // 모달을 여는 경우, 선택적 렌더링
    let content: React.ReactNode = null;
    switch (modalType) {
        case 'ADD_LP':
            content = <AddLPModal />;
            break;
        default:
            content = <div>Modal Open Error</div>;
    }

    return (
        <>
        {/* 오버레이 */}
        <div
            className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-300"
            onClick={closeModal}
        >

        {/* 모달 영역 */}
        <div
            className="
                flex items-center justify-center 
                fixed inset-0 z-50 p-4 
                "
        >
            {content}
        </div>
        </div>
        </>
    )
}

export default ModalShell;