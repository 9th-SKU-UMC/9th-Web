import MoviePage from "./MoviePage";

export default function NowPlaying() {
  return (
    <MoviePage category="now_playing" token={import.meta.env.VITE_TMDB_KEY} />
  );
}
