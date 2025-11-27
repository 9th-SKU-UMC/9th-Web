import { useNavigate } from "react-router-dom";

interface LpCardProps {
  id: number;
  title: string;
  thumbnail: string;
  createdAt: Date;
  likes: number;
}

export default function LPCard({
  id,
  title,
  thumbnail,
  createdAt,
  likes,
}: LpCardProps) {
  const navigate = useNavigate();
  const formattedDate = new Date(createdAt).toLocaleDateString("ko-KR");

  return (
    <div
      onClick={() => navigate(`/lp/${id}`)}
      className="group relative cursor-pointer overflow-hidden shadow-md bg-white/5 backdrop-blur transition-all duration-300 hover:shadow-xl hover:-translate-y-1 aspect-square"
    >
      <img
        src={thumbnail || "/default-thumbnail.png"}
        alt={title}
        className="w-full h-full object-cover transform duration-500 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex flex-col justify-center items-center text-center text-white opacity-0 group-hover:opacity-100 px-4">
        <h2 className="text-xl font-semibold mb-1 drop-shadow-lg">{title}</h2>
        <p className="text-sm text-gray-200">업로드일: {formattedDate}</p>
        <p className="text-sm text-gray-200 mt-1">좋아요: {likes}</p>
      </div>
    </div>
  );
}
