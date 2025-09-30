import React from "react";
import { Link, useLocation } from "react-router-dom";

const linkBase = "px-2 py-0.5 rounded text-sm transition-colors duration-150";
const linkIdle = "text-gray-500 hover:text-gray-700";
const linkActive = "text-green-700 bg-green-100";

type ItemProps = {
    to: string;
    children: React.ReactNode;
}

const Item = ({ to, children }: ItemProps) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link
            to={to}
            className={[linkBase, isActive ? linkActive : linkIdle].join(" ")}
        >
            {children}
        </Link>
    )
}


const Navbar = () => {
    return (
        <>
        <nav className="bg-white flex space-x-2">
            <Item to = "/">HOME</Item>
            <Item to = "/popular">인기 영화</Item>
            <Item to = "/now-playing">상영 중</Item>
            <Item to = "/upcoming">개봉 예정</Item>
            <Item to = "/top-rated">평점 높은</Item>
        </nav>
        </>
    )
}

export default Navbar;