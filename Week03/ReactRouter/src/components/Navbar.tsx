import { NavLink } from "react-router-dom";
import clsx from "clsx";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  clsx(
    "no-underline font-bold text-[18px] transition-transform active:scale-90",
    isActive ? "text-[#ff1493]" : "text-[#ffa5e4]"
  );

export default function Navbar() {
  return (
    <div className="bg-[#ffe1f6] p-[30px] flex justify-center h-[100px] w-auto">
      <nav className="flex gap-[100px]">
        <NavLink to="/" className={linkClass}>
          Movies
        </NavLink>
        <NavLink to="popular" className={linkClass}>
          Popular
        </NavLink>
        <NavLink to="now_playing" className={linkClass}>
          Now Playing
        </NavLink>
        <NavLink to="upcoming" className={linkClass}>
          Upcoming
        </NavLink>
        <NavLink to="top_rated" className={linkClass}>
          Top Rated
        </NavLink>
      </nav>
    </div>
  );
}
