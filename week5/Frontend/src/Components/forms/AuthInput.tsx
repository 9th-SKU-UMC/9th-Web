import React, { useState } from 'react';
import clsx from 'clsx';

type AuthInputProps = {
    id: string;
    name: string;
    type: string;
    value: string;
    placeholder?: string;
    errorMessage?: string;
    invalid?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AuthInput = (
    { id, name, type, value, placeholder, errorMessage, invalid, onChange }: AuthInputProps
) => {

    const showError = Boolean(invalid && errorMessage);

    return (
        <>
            <input 
                id={id}
                name={name}
                value={value}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                required
                className={clsx(
                    "w-full h-10 rounded-md px-3 text-sm outline-none",
                    "bg-zinc-900 text-white placeholder-white/50",
                    "border",
                    showError ? "border-red-500" : "border-white/30",
                    "focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500",
                    "transition"
                )}
            />
            {showError && (
                <span className="mt-1 block text-xs text-red-500">{errorMessage}</span>
            )}
        </>
    )
}

export default AuthInput;