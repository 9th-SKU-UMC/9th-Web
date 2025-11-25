import React, { useState } from "react";
import { useModalControll } from "../../Hooks/ModalControllProvider";
import { CloseIcon } from "../../assets/svg";
import SubmitButton from "../buttons/SubmitButton";

const AddLPModal = () => {
    const { closeModal } = useModalControll();

    const handleClick = () => console.log("Add LP Submit");

    return (
        <>
        <div className="w-full max-w-md rounded-2xl bg-zinc-900 px-6 py-6 sm:px-8 sm:py-7">
            {/* 상단 우측 X 버튼 */}
            <div className="flex justify-end">
                <button
                    type ="button" 
                    onClick={closeModal}
                    className="inline-flex h-4 w-4 items-center justify-center cursor-pointer"
                >
                    <CloseIcon/>
                </button>
            </div>

            {/* 제출 버튼 */}
            <SubmitButton type="submit" value="Add LP" onClick={handleClick} />
        </div>
        </>
    )
}

export default AddLPModal