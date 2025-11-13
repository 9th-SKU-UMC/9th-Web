import { useNavigate } from "react-router-dom";

interface LpCardProps {
  id: number;
  title: string;
  thumbnail: string;
  createdAt: Date;
  likes: number;
}

const LPCard = ({ id, title, thumbnail, createdAt, likes }: LpCardProps) => {
  const navigate = useNavigate();
  const formattedDate = new Date(createdAt).toLocaleDateString("ko-KR");

  const handleClick = () => {
    navigate(`/lp/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="relative cursor-pointer overflow-hidden rounded-md shadow-sm transition-transform duration-300 hover:scale-105 hover:shadow-lg"
    >
      <img
        src={thumbnail || "/default-thumbnail.png"}
        alt={title}
        className="w-full h-64 object-cover"
      />

      <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-60 transition-all duration-300 flex flex-col justify-center items-center text-white opacity-0 hover:opacity-100">
        <h2 className="font-bold text-lg text-center">{title}</h2>
        <p className="text-sm text-gray-200">업로드일: {formattedDate}</p>
        <p className="text-sm text-gray-200 mt-1">좋아요: {likes}</p>
      </div>
    </div>
  );
};

export default LPCard;
