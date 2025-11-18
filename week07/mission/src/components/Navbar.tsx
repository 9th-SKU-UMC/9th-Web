import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import type { ResponseMyInfoDto } from "../types/auth";
import { getMyInfo } from "../apis/auth";
import { useLogout } from "../hooks/mutations/useLogout";

export default function Navbar() {
  const { accessToken, logout } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState<ResponseMyInfoDto | null>(null);

  const logoutMutation = useLogout();

  useEffect(() => {
    if (!accessToken) {
      return;
    }
    const getData = async () => {
      const response = await getMyInfo();
      setData(response);
    };
    getData();
  }, [accessToken]);

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        logout();
        navigate("/login");
      },
      onError: () => {
        alert("로그아웃 실패!");
      },
    });
  };

  return (
    <div className="w-full h-17 flex items-center justify-end gap-3 px-6 border-b border-gray-200 bg-white sticky top-0 z-10">
      {accessToken ? (
        <>
          <button
            onClick={() => navigate("/mypage")}
            className="cursor-pointer"
          >
            🔍 {data?.data.name}님 반갑습니다.
          </button>

          <button onClick={handleLogout} className="gap-3 cursor-pointer">
            로그아웃
          </button>
        </>
      ) : (
        <>
          <button onClick={() => navigate("/login")} className="cursor-pointer">
            로그인
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="cursor-pointer"
          >
            회원가입
          </button>
        </>
      )}
    </div>
  );
}
