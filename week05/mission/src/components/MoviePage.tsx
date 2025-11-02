import MovieCard from "./MovieCard";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import { useCustomFetch } from "../hooks/useCustomFetch";
import type { MovieResponse, MoviePageProps } from "../types/movie";

export default function MoviePage({ category }: MoviePageProps) {
  const url = `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=1`;
  const { data, isLoading, error } = useCustomFetch<MovieResponse>(url);

  if (error) return <ErrorMessage message={error} />;
  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-10">
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {data?.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
