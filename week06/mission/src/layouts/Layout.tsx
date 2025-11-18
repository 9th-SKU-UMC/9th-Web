import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";

function Layout() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="flex">
      {/* ▼ 사이드바 ----------------------------------------- */}
      <div
        className={`${
          collapsed ? "w-16" : "w-64"
        } h-screen bg-white dark:bg-[#15161A] shadow-md flex flex-col transition-all duration-300 fixed left-0 top-0 z-20`}
      >
        {/* 사이드바 상단 헤더 */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="4"
                d="M7.95 11.95h32m-32 12h32m-32 12h32"
              />
            </svg>
          </button>
        </div>

        {/* ▼ 메뉴 목록 */}
        <nav className="flex-grow mt-4 overflow-y-auto">
          <NavLink
            to="/"
            className="flex items-center px-4 py-2 m-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1E2028]"
          >
            {!collapsed && <span className="ml-2">홈</span>}
          </NavLink>

          <NavLink
            to="/popular"
            className="flex items-center px-4 py-2 m-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1E2028]"
          >
            {!collapsed && <span className="ml-2">인기 영화</span>}
          </NavLink>

          <NavLink
            to="/upcoming"
            className="flex items-center px-4 py-2 m-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1E2028]"
          >
            {!collapsed && <span className="ml-2">개봉 예정</span>}
          </NavLink>

          <NavLink
            to="/top-rated"
            className="flex items-center px-4 py-2 m-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1E2028]"
          >
            {!collapsed && <span className="ml-2">평점 높은</span>}
          </NavLink>

          <NavLink
            to="/now-playing"
            className="flex items-center px-4 py-2 m-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1E2028]"
          >
            {!collapsed && <span className="ml-2">상영 중</span>}
          </NavLink>
        </nav>
      </div>

      {/* ▼ 메인 영역 ----------------------------------------- */}
      <div
        className={`flex-1 transition-all ${
          collapsed ? "ml-16" : "ml-64"
        } min-h-screen bg-gray-50 dark:bg-[#111]`}
      >
        <Navbar />
        {/* ▼ 페이지 콘텐츠 */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
