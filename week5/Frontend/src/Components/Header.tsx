import { NavLink, Link, useLocation } from "react-router-dom";
import { authStorage } from "../shared/apiConfig/authStorage";
import clsx from "clsx";
import { logout } from "../apis/auth/logout";

const Header = () => {
    const location = useLocation();
    // console.log(location);

    const isAuthenticated = authStorage.isAuthenticated();

    const isLogin = location.pathname === '/login';
    const isSignUp = location.pathname === '/signup';

    const handleLogout = async () => {
        await logout();
    };

    const baseButton = 
        "inline-flex items-center justify-center rounded-md px-3.5 py-2 text-sm font-semibold transition";
    
    const inActiveButton = 
        "bg-zinc-900 text-zinc-200 border border-zinc-700 hover:bg-zinc-800";
    
    const activeButton = 
        "bg-pink-500 text-white hover:bg-pink-400";

    return (
        <>
        <header className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-black/90">
            <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link 
                    to="/"
                    className="text-lg font-extrabold"
                >
                    돌려돌려LP판
                </Link>
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
                        <button
                            onClick={handleLogout}
                            className={clsx(baseButton,{
                                [activeButton]: isLogin,
                                [inActiveButton]: !isLogin,
                            })}
                        >
                            로그아웃
                        </button>
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
        </header>
        </>
    )
}

export default Header;