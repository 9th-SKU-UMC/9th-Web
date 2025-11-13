import { useParams } from "react-router-dom";
import { useGetLpDetail } from "../hooks/queries/useGetLpDetail.ts";

const LpDetailPage = () => {
  const { lpid } = useParams<{ lpid: string }>();
  const id = Number(lpid);

  const { data, isPending, isError } = useGetLpDetail(id);

  if (isPending) {
    return <div className="mt-20 p-6 text-gray-500">로딩 중...</div>;
  }

  if (isError) {
    return <div className="mt-20 p-6 text-red-500">에러가 발생했습니다.</div>;
  }

  const lp = data?.data;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{lp.title}</h1>
      <h1 className="text-2xl font-bold">LP 상세 페이지</h1>
      <p>현재 LP의 ID: {lpid}</p>

      {/* ✅ 이미지 썸네일 */}
      {lp.thumbnail && (
        <img
          src={lp.thumbnail}
          alt={lp.title}
          className="w-full max-w-md rounded-md shadow mb-4"
        />
      )}

      <p className="text-gray-600 mb-2">
        업로드일: {new Date(lp.createdAt).toLocaleDateString("ko-KR")}
      </p>

      <p className="text-gray-600 mb-4">좋아요 수: {lp.likes?.length ?? 0}</p>

      <div className="text-gray-800 whitespace-pre-wrap leading-relaxed">
        {lp.content}
      </div>
    </div>
  );
};

export default LpDetailPage;
