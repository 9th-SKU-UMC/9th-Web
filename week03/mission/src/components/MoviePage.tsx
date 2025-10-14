import { useEffect, useState } from "react";
import axios from "axios";
import type { Movie, MovieResponse, MoviePageProps } from "../types/movie";
import MovieCard from "./MovieCard";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

const TMBD_TOKEN = import.meta.env.VITE_TMDB_KEY;

export default function MoviePage({ category }: MoviePageProps) {
  const [movies, setmovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const fetchMovies = async () => {
      try {
        const { data } = await axios.get<MovieResponse>(
          `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${TMBD_TOKEN}`,
            },
          }
        );

        setmovies(data.results);
      } catch (error) {
        setError("영화 데이터를 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [category, page]);

  if (error) return <ErrorMessage message={error}></ErrorMessage>;
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="p-10">
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`px-4 py-2 rounded ${
            page === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          이전
        </button>

        <span className="flex items-center">{page} 페이지</span>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          다음
        </button>
      </div>
    </div>
  );
}
