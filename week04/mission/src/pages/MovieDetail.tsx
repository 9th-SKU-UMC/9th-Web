import { useParams } from "react-router-dom";
import { useCustomFetch } from "../hooks/useCustomFetch";
import type { Cast, MovieDetail } from "../types/movie";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

export default function MovieDetail() {
  const { movieId } = useParams();
  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR&append_to_response=credits`;
  const { data: movie, isLoading, error } = useCustomFetch<MovieDetail>(url);

  if (error) return <ErrorMessage message={error} />;
  if (isLoading) return <LoadingSpinner />;
  if (!movie) return null;

  const credits = movie.credits;

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
          className="rounded-xl shadow-lg"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <p className="text-gray-600 mb-2">
            {movie.release_date?.slice(0, 4)} · 평점 {movie.vote_average}
          </p>
          <p className="leading-relaxed">{movie.overview}</p>
        </div>
      </div>
      {credits && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">감독/출연</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {credits.cast.slice(0, 10).map((person: Cast) => (
              <div key={person.id} className="text-center">
                <img
                  src={
                    (person.profile_path = `https://image.tmdb.org/t/p/w200${person.profile_path}`)
                  }
                  alt={person.name}
                  className="rounded-full w-24 h-24 object-cover mx-auto mb-2"
                />
                <p className="font-medium">{person.name}</p>
                <p className="text-sm text-gray-500">{person.character}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
