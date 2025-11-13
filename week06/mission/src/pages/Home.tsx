import { useState, useRef, useEffect } from "react";
import useGetLpList from "../hooks/queries/useGetLpList.ts";
import { PAGINATION_ORDER } from "../types/common.ts";
import LpCard from "../components/LpCard.tsx";
import SkeletonCard from "../components/SkeletonCard.tsx"; // ⭐ 스켈레톤 추가

const Home = () => {
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);

  const toggleOrder = () => {
    setOrder((prev) =>
      prev === PAGINATION_ORDER.desc
        ? PAGINATION_ORDER.asc
        : PAGINATION_ORDER.desc
    );
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError,
  } = useGetLpList({
    search: "",
    order,
    limit: 10,
  });

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loadMoreRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  //⭐ 페이지 전체 로딩 시 (맨 처음)
  if (isPending) {
    return (
      <div className="mt-10 px-6 grid grid-cols-3 gap-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (isError) return <div className="mt-20">에러가 발생했습니다.</div>;

  //⭐ 여러 페이지의 데이터를 하나로 합침
  const allLps = data?.pages.flatMap((page) => page.data.data) ?? [];

  console.log("📦 LP 목록 데이터:", allLps);
  console.log("🟢 로딩 상태:", isPending ? "로딩 중" : "로딩 완료");
  console.log("🔴 에러 발생 여부:", isError ? "에러 있음" : "정상 작동");
  console.log(
    "📦 LP ID:",
    allLps.map((lp) => lp.id)
  );

  return (
    <div className="mt-10 px-6">
      {/* 🔁 정렬 토글 버튼 */}
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleOrder}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          {order === PAGINATION_ORDER.desc ? "최신순" : "오래된순"}
        </button>
      </div>

      {/* 🧱 LP 카드 목록 */}
      <div className="grid grid-cols-3 gap-4">
        {allLps.map((lp) => (
          <LpCard
            key={lp.id}
            id={lp.id}
            title={lp.title}
            thumbnail={lp.thumbnail}
            createdAt={lp.createdAt}
            likes={lp.likes.length}
          />
        ))}

        {/* ⭐ 다음 페이지 로딩 중이면 하단에 스켈레톤 카드 표시 */}
        {isFetchingNextPage &&
          Array.from({ length: 3 }).map((_, i) => (
            <SkeletonCard key={`s-${i}`} />
          ))}
      </div>

      {/* 🔽 무한 스크롤 트리거 */}
      <div
        ref={loadMoreRef}
        className="h-10 flex justify-center items-center mt-6 text-gray-500"
      >
        {isFetchingNextPage
          ? "불러오는 중..."
          : hasNextPage
          ? "↓ 스크롤하면 더보기"
          : "모든 데이터를 불러왔습니다."}
      </div>
    </div>
  );
};

export default Home;
