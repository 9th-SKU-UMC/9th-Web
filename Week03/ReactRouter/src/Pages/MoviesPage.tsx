import { useEffect, useState } from "react";
import type { Movie, MovieResponse } from "../types/movie";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import { useParams, useNavigate } from "react-router-dom";

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const { category } = useParams<{
    category: string;
  }>();

  useEffect(() => {
    setPage(1);
    setIsError(false);
    setMovies([]);
  }, [category]);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get<MovieResponse>(
          `https://api.themoviedb.org/3/movie/${category}?&language=en-US&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
              accept: "application/json",
            },
          }
        );
        setMovies(data.results);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [page, category]);

  if (isError) return <span className="text-red-500 text-2xl">ERROR</span>;
  window.scrollTo(0, 0);

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-dvh">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="m-10 py-5 px-10 grid grid-cols-5 gap-10">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="relative group"
              onClick={() => navigate(`/${category}/${movie.id}`)}
            >
              {movie.poster_path && (
                <>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="rounded-2xl transition duration-300 group-hover:blur-[3px]"
                  />
                  <div
                    className="
              absolute inset-0 flex p-5 justify-center
              text-white text-center bg-black/20
              opacity-0 group-hover:opacity-100 overflow-auto rounded-2xl
            "
                  >
                    <div>
                      <div className="text-xl font-bold my-5">
                        {movie.title}
                      </div>
                      {movie.overview}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center justify-center m-10 gap-10 text-2xl">
        <button
          className="flex bg-[#bddfee] text-white px-4 py-2 rounded-xl hover:bg-[#6fb4e5] transition-all duration-200 disabled:bg-gray-300 cursor-pointer disabled:cursor-not-allowed"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >{`<`}</button>
        <span className="text-[#6fb4e5]">{page}</span>
        <button
          className="flex bg-[#bddfee] text-white px-4 py-2 rounded-xl hover:bg-[#6fb4e5] transition-all duration-200 cursor-pointer"
          onClick={() => setPage((prev) => prev + 1)}
        >{`>`}</button>
      </div>
    </>
  );
}
