import type { MouseEvent } from "react";
import type { LinkProps } from "../types/LinkProps";
import { getCurrentPath } from "../utils/getCurrentPath";
import { navigateTo } from "../utils/navigateTo";

export const Link =({to, children, replace}: LinkProps) => {
    const handleclick = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if(getCurrentPath() === to) return;
        navigateTo(to, !!replace);
    }

    return (
        <a href={to} onClick={handleclick}>
            {children}
        </a>
    )
}