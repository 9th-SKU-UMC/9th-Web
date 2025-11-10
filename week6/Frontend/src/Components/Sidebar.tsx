import { useContext, useEffect, useRef } from "react";
import { SidebarContext } from "../Hooks/SidebarProvider";
import clsx from "clsx";
import { Link } from "react-router-dom";

const Sidebar = () => {
    const sidebarContext = useContext(SidebarContext);
    const isSidebarOpen = sidebarContext?.isSidebarOpen;
    const toggleSidebar = sidebarContext?.toggleSidebar;
    const panelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // 외부 영역 클릭, 또는 ESC 키 입력 시 사이드바 닫기
        
    }, [isSidebarOpen, toggleSidebar]);

    const linkStyle = "flex items-center gap-2 px-3 py-2";

    return (
        <>
        {/* overlay */}
        <div
            className={clsx(
                "fixed inset-0 z-40 bg-black/40",
                isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            )}
            onClick={toggleSidebar}
            aria-hidden
        />

        {/* content */}
        <aside
            aria-hidden={!isSidebarOpen}
            className={clsx(
                // layout, background
                "fixed top-0 left-0 z-50 h-dvh w-72 bg-zinc-700 shadow-lg",
                // motion
                "transform-gpu will-change-transform transition-transform duration-300 ease-out",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}
        >
            <div ref={panelRef} className="flex h-full flex-col">
                <nav>
                    <Link
                        to=".."
                        className={linkStyle}
                        onClick={toggleSidebar}
                    >
                        <span className="text-base">🔎</span>
                        찾기
                    </Link>

                    <Link
                        to=".."
                        className={linkStyle}
                        onClick={toggleSidebar}
                    >
                        <span className="text-base">👤</span>
                        마이페이지
                    </Link>
                </nav>

                <footer className="mt-auto px-2 py-3">
                    <button
                        className="w-full px-3 py-2"
                        onClick={()=>{
                            // 탈퇴 로직 연결
                            console.log('탈퇴하기');
                        }}
                    >
                        탈퇴하기
                    </button>
                </footer>
            </div>
        </aside>
        </>
    )
}

export default Sidebar;