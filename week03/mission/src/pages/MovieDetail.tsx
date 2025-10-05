import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MovieDetail() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<any>(null);
  const [credits, setCredits] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieRes = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );

        const creditsRes = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );

        setMovie(movieRes.data);
        setCredits(creditsRes.data);
      } catch (error) {
        setError("error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [movieId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-blue-600 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 font-semibold text-center mt-10">
        {error}
      </div>
    );
  }

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
            {credits.cast.slice(0, 10).map((person: any) => (
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
