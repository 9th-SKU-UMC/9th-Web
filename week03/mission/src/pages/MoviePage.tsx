import { useEffect, useState } from "react";
import axios from "axios";
import type { Movie, MovieResponse, MoviePageProps } from "../types/movie";
import MovieCard from "../components/MovieCard";

export default function MoviePage({ category, token }: MoviePageProps) {
  const [movies, setmovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const { data } = await axios.get<MovieResponse>(
          `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`,
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          }
        );

        setmovies(data.results);
      } catch (error) {
        setError("error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [category, page, token]);

  if (error) {
    return (
      <div className="text-red-600 font-semibold text-center mt-10">
        {error}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-blue-600 border-white"></div>
      </div>
    );
  }

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
