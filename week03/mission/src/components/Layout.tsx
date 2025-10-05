import { NavLink, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <nav className="fixed top-0 left-0 w-full h-[50px] p-5 box-border bg-white shadow-md z-50">
        <ul className="list-none p-0 m-0 flex flex-row justify-center w-full">
          <li className="mr-6">
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
          <li className="mr-6">
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
          <li className="mr-6">
            <NavLink
              to="/upcoming"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-bold"
                  : "text-balck hover:text-blue-600"
              }
            >
              개봉 예정
            </NavLink>
          </li>
          <li className="mr-6">
            <NavLink
              to="/top-rated"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-bold"
                  : "text-balck hover:text-blue-600"
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
                  : "text-balck hover:text-blue-600"
              }
            >
              상영 중
            </NavLink>
          </li>
        </ul>
      </nav>
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
