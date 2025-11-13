import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { accessToken, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div
      className="w-full h-17 flex items-center justify-end gap-3 px-6 border-b 
                 border-gray-200 dark:border-gray-700 bg-white dark:bg-[#15161A] 
                 sticky top-0 z-10"
    >
      {accessToken ? (
        <>
          <button
            onClick={() => navigate("/mypage")}
            className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            마이페이지
          </button>

          <button
            onClick={logout}
            className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
          >
            로그아웃
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => navigate("/login")}
            className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            로그인
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600"
          >
            회원가입
          </button>
        </>
      )}
    </div>
  );
}
