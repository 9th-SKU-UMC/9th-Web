import MoviePage from "./MoviePage";

export default function TopRated() {
  return (
    <MoviePage category="top_rated" token={import.meta.env.VITE_TMDB_KEY} />
  );
}
