import { NavLink, Link, useLocation } from "react-router-dom";
import { authStorage } from "../shared/apiConfig/authStorage";
import clsx from "clsx";
import { logout } from "../apis/auth/logout";
import { HamburgerIcon } from "../assets/svg";
import { useContext } from "react";
import { SidebarContext } from "../Hooks/SidebarProvider";
import { SearchIcon } from "../assets/svg";
import { useToggleSearchSection } from "../Hooks/ToggleSearchSection";
import { CloseIcon } from "../assets/svg";

const Header = () => {
    const location = useLocation();
    const isAuthenticated = authStorage.isAuthenticated();
    const userInfo = authStorage.getUserInfo();
    const sidebarContext = useContext(SidebarContext);

    const isLogin = location.pathname === '/login';
    const isSignUp = location.pathname === '/signup';

    const handleLogout = async () => {
        await logout();
    };

    const { isSearchSectionOpen, toggleSearchSection } = useToggleSearchSection();

    const baseButton = 
        "inline-flex items-center justify-center rounded-md px-3.5 py-2 text-sm font-semibold transition";
    
    const inActiveButton = 
        "bg-zinc-900 text-zinc-200 border border-zinc-700 hover:bg-zinc-800";
    
    const activeButton = 
        "bg-pink-500 text-white hover:bg-pink-400";

    return (
        <>
        <header className="sticky top-0 z-40 w-full bg-zinc-800">
            <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex gap-4">
                    <button onClick={sidebarContext?.toggleSidebar}>
                        <HamburgerIcon className="h-6 w-6 text-zinc-200 cursor-pointer"/>
                    </button>

                    {/* LOGO */}
                    <Link 
                        to="/"
                        className="text-lg font-extrabold text-pink-500"
                    >
                        DOLIGO
                    </Link>
                </div>

                <div className="flex items-center space-x-4">
                    <button>
                        {isSearchSectionOpen ? (
                            <CloseIcon 
                                className="h-3 w-3 text-zinc-200 cursor-pointer"
                                onClick={toggleSearchSection}
                            />
                        ) : (
                            <SearchIcon 
                                className="h-5 w-5 text-zinc-200 cursor-pointer"
                                onClick={toggleSearchSection}
                            />
                        )}
                    </button>
                    
                    <nav className="space-x-2">
                        {!isAuthenticated 
                            ? (
                            <NavLink
                                to="/login"
                                className={clsx(baseButton,{
                                    [activeButton]: isLogin,
                                    [inActiveButton]: !isLogin,
                                })}
                            >
                                로그인
                            </NavLink>
                            ) : (
                            <p
                                className="inline-flex"
                            >
                                {userInfo?.name}님 반갑습니다.
                            </p>
                        )}

                        <NavLink
                            to="/signup"
                            className={clsx(baseButton,{
                                [activeButton]: isSignUp,
                                [inActiveButton]: !isSignUp,
                            })}
                        >
                            회원가입
                        </NavLink>
                    </nav>
                </div>
            </div>
        </header>
        </>
    )
}

export default Header;