import { useEffect, useState } from "react";
import type { MovieDetail, Credits, Cast } from "../types/movie";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import { useParams, useNavigate } from "react-router-dom";

export default function MovieDetailPage() {
  const navigate = useNavigate();
  const { movieid } = useParams<{ movieid: string }>();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [detail, setDetail] = useState<MovieDetail | null>(null);
  const [cast, setCast] = useState<Cast[]>([]);

  useEffect(() => {
    if (!movieid) {
      navigate("/", { replace: true });
      return;
    }

    window.scrollTo(0, 0);

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

    const fetchCredits = async () => {
      try {
        const { data } = await axios.get<Credits>(
          `https://api.themoviedb.org/3/movie/${movieid}/credits`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOWEzODg5MTY5MGI0NTNhZmY2NGEwMzI0YjkyNDgxNSIsIm5iZiI6MTc1OTQyMTAxOC4yODQsInN1YiI6IjY4ZGVhMjVhZDg3M2M0YmEyMTZhNzk1MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wLJhZd0FnpmZ3zgjHMMOKpac0hhGwGFF0uR_8nBrmpw",
              accept: "application/json",
            },
          }
        );
        setCast(data.cast);
      } catch (e) {
        console.error(e);
        setIsError(true);
      }
    };

    fetchMovieDetail();
    fetchCredits();
  }, [movieid, navigate]);

  if (isError) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <span className="text-red-500 text-2xl">ERROR</span>
      </div>
    );
  }

  return (
    <div className="bg-black/70 text-white min-h-dvh">
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
                alt={detail.title}
                className="rounded-2xl h-100"
              />

              <div className="m-10">
                <div className="text-4xl font-bold">{detail.title}</div>
                <div className="text-s font-light my-3">
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

                {cast.length > 0 && (
                  <div className="mt-10">
                    <h3 className="text-2xl font-bold mb-4">Cast</h3>
                    <div className="flex grid grid-cols-10 gap-2 overflow-auto">
                      {cast.map((actor) => (
                        <div key={actor.id}>
                          {actor.profile_path ? (
                            <img
                              src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                              alt={actor.name}
                              className="rounded-lg w-24 h-36 object-cover"
                            />
                          ) : (
                            <div className="rounded-lg bg-gray-500 w-24 h-36 object-cover" />
                          )}

                          <p className="mt-2 text-sm">{actor.name}</p>
                          <p className="text-xs text-gray-400">
                            {actor.character}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
