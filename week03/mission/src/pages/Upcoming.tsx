import MoviePage from "./MoviePage";

export default function Upcoming() {
  return (
    <MoviePage category="upcoming" token={import.meta.env.VITE_TMDB_KEY} />
  );
}
