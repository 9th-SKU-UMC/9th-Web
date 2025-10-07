import { useEffect, useState } from "react";
import type { MovieDetail } from "../types/movie";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import { useParams, useNavigate } from "react-router-dom";

export default function MovieDetailPage() {
  const navigate = useNavigate();
  const { movieid } = useParams<{ movieid: string }>();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [detail, setDetail] = useState<MovieDetail | null>(null);

  useEffect(() => {
    if (!movieid) {
      navigate("/", { replace: true });
      return;
    }

    const fetchMovieDetail = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const { data } = await axios.get<MovieDetail>(
          `https://api.themoviedb.org/3/movie/${movieid}?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
              accept: "application/json",
            },
          }
        );
        setDetail(data);
      } catch (e) {
        console.error(e);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetail();
  }, [movieid, navigate]);

  if (isError) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <span className="text-red-500 text-2xl">ERROR</span>
      </div>
    );
  }

  return (
    <div className="bg-black/70 text-white h-dvh">
      {isLoading ? (
        <div className="flex items-center justify-center h-dvh">
          <LoadingSpinner />
        </div>
      ) : detail ? (
        <>
          <div className="relative text-white min-h-[100svh] overflow-x-hidden">
            {detail?.backdrop_path && (
              <div
                className="absolute inset-0 -z-10 bg-cover bg-center"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w1280${detail.backdrop_path})`,
                }}
              />
            )}
            <div className="absolute inset-0 -z-0" />
            <div className="flex p-10">
              <img
                src={`https://image.tmdb.org/t/p/w500${detail.poster_path}`}
                alt={detail.original_title}
                className="rounded-2xl"
              />

              <div className="m-10">
                <div className="text-4xl font-bold mb-10">
                  {detail.original_title}
                </div>
                <div className="text-xl font-light leading-6 opacity-90">
                  {detail.overview}
                </div>
                <div className="my-10">
                  <div className="my-3">{detail.release_date}</div>
                  <div className="my-3">{detail.runtime} mins</div>
                  <div className="my-3">★ {detail.vote_average}</div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-[60vh] text-gray-500">
          No Detail T.T
        </div>
      )}
    </div>
  );
}
