import { useParams } from "react-router-dom";
import { useGetLpDetail } from "../hooks/queries/useGetLpDetail";
import { usePostLike } from "../hooks/mutations/usePostLike";
import { useDeleteLike } from "../hooks/mutations/useDeleteLike";
import { useGetMyInfo } from "../hooks/queries/useGetMyInfo";
import type { Likes } from "../types/lp";
import defaultImg from "../assets/default-profile.jpg";

export default function LpDetailPage() {
  const { lpid } = useParams();
  const id = Number(lpid);

  const { data, isPending, isError } = useGetLpDetail(id);
  const { data: me, isPending: mePending } = useGetMyInfo();

  const postLikeMutation = usePostLike(id);
  const deleteLikeMutation = useDeleteLike(id);

  if (isPending || mePending) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-400 text-lg">
        로딩 중...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-64 text-red-500 text-lg font-semibold">
        에러가 발생했습니다.
      </div>
    );
  }
  const userLike = data?.data.likes?.some(
    ({ userId }: Likes) => userId === me?.data.id
  );

  const toggleLike = () => {
    if (userLike) {
      deleteLikeMutation.mutate();
    } else {
      postLikeMutation.mutate();
    }
  };

  return (
    <div className="w-full flex justify-center py-10">
      <div className="w-full max-w-3xl rounded-3xl p-10 shadow-2xl">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <img
              src={data?.data.author?.avatar || defaultImg}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-semibold">{data?.data.author?.name}</span>
          </div>

          <div className="flex items-center gap-4">
            <span>
              {new Date(data?.data.createdAt).toLocaleDateString("ko-KR")}
            </span>
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-8">{data?.data.title}</h1>

        {data?.data.thumbnail && (
          <div className="w-full flex justify-center mb-10">
            <div className="bg-gray-200 p-6 shadow-xl">
              <img
                src={data?.data.thumbnail}
                alt={data?.data.title}
                className="w-[350px] h-[350px] object-cover rounded-full shadow-lg"
              />
            </div>
          </div>
        )}

        <div className="text-base leading-relaxed mb-8 whitespace-pre-wrap">
          {data?.data.content}
        </div>

        <div className="w-full flex flex-col items-center mt-6">
          <button
            onClick={toggleLike}
            className="text-4xl hover:scale-110 transition disabled:opacity-50"
            disabled={
              postLikeMutation.isPending || deleteLikeMutation.isPending
            }
          >
            {userLike ? "❤️" : "🤍"}
          </button>
          <span className="mt-1">{data?.data.likes?.length ?? 0}</span>
        </div>
      </div>
    </div>
  );
}
