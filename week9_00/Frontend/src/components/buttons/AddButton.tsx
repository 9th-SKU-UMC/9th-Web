import { AddIcon } from "../../assets/svg";
import { AddIconWhite } from "../../assets/svg";
import React from "react";

interface AddButtonProps {
    className?: string;
    onClick: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ className, onClick }) => {
    return (
        <button
            className={`flex items-center justify-center rounded-full bg-pink-500 text-white cursor-pointer w-12 h-12 shadow ${className}`}
            onClick={onClick}
        >
            <AddIconWhite
                className="w-6 h-6" 
                stroke="#FFFFFF"
            />
        </button>
    )
}

export default AddButton;