import MoviePage from "./MoviePage";

export default function Popular() {
  return <MoviePage category="popular" token={import.meta.env.VITE_TMDB_KEY} />;
}
