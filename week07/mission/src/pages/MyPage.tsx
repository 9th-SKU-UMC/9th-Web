import { useEffect, useState } from "react";
import type { ResponseMyInfoDto } from "../types/auth";
import { getMyInfo } from "../apis/auth";
import useGetLpList from "../hooks/queries/useGetLpList";
import LpCard from "../components/LpCard";
import { PAGINATION_ORDER } from "../enums/common";

export default function MyPage() {
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);

  // LP 전체 목록 조회
  const lpQuery = useGetLpList({
    search: "",
    order: PAGINATION_ORDER.desc,
    limit: 100,
  });

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      setData(response);
    };
    getData();
  }, []);

  const user = data?.data;

  // LP 목록 정리
  const allLps = lpQuery.data?.pages.flatMap((p) => p.data.data) ?? [];
  const myLps = user ? allLps.filter((lp) => lp.authorId === user.id) : [];

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        {user?.avatar ? (
          <img
            src={user.avatar as string}
            alt="프로필 이미지"
            className="w-20 h-20 rounded-full object-cover shadow"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 shadow">
            아바타 없음
          </div>
        )}

        <div>
          <h1 className="text-2xl font-bold">{user?.name}님 환영합니다!</h1>
          <p className="text-gray-500">{user?.email}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-6 leading-relaxed">
        <h2 className="text-xl font-semibold mb-4">내 정보</h2>
        <p className="text-gray-700">이름: {user?.name}</p>
        <p className="text-gray-700 mt-1">이메일: {user?.email}</p>
      </div>

      {/* 내가 만든 LP 목록 */}
      <div className="bg-white rounded-2xl shadow p-6 leading-relaxed mt-8">
        <h2 className="text-xl font-semibold mb-4">내가 만든 LP</h2>

        <div className="grid grid-cols-2 gap-4">
          {myLps.map((lp) => (
            <LpCard
              key={lp.id}
              id={lp.id}
              title={lp.title}
              thumbnail={lp.thumbnail}
              createdAt={lp.createdAt}
              likes={lp.likes.length}
            />
          ))}

          {myLps.length === 0 && (
            <p className="text-gray-500 text-sm">작성한 LP가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}
