import { NavLink, Outlet, useNavigate } from "react-router-dom";

function Layout() {
  const navigate = useNavigate();

  return (
    <div>
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 flex items-center px-5 h-[50px]">
        <ul className="list-none p-0 m-0 flex gap-6 flex-1 justify-center">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-bold"
                  : "text-black hover:text-blue-600"
              }
            >
              홈
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/popular"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-bold"
                  : "text-black hover:text-blue-600"
              }
            >
              인기 영화
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/upcoming"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-bold"
                  : "text-black hover:text-blue-600"
              }
            >
              개봉 예정
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/top-rated"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-bold"
                  : "text-black hover:text-blue-600"
              }
            >
              평점 높은
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/now-playing"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-bold"
                  : "text-black hover:text-blue-600"
              }
            >
              상영 중
            </NavLink>
          </li>
        </ul>

        <div className="flex gap-2">
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
          >
            로그인
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
          >
            회원가입
          </button>
        </div>
      </nav>

      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
