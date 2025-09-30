import { useState, useEffect } from "react";
import { Movie } from "../types/Movie";
import { getNowPlayingMovies } from "../api/nowplaying";
import MovieCard from "../components/MovieCard";
import LoadingSpinner from "../components/LoadingSpinner";
import PageNavigator from "../components/PageNavigator";

// 상영 중인 영화 페이지
const NowPlaying = () => {
    const [movies, setMovies] = useState<Movie[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            const { data, error } = await getNowPlayingMovies(currentPage);

            if (error) {
                setError(error);
            } else if (data) {
                setMovies(data.results);
                setTotalPages(data.total_pages);
            }

            setLoading(false);
            console.log(data);
        }
        fetchMovies();
    }, [currentPage]);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    }

    if (error) return <p>에러 발생: {error}</p>
    if (loading) return <LoadingSpinner />;

    return (
        <>
        <PageNavigator currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        <div className="grid grid-cols-6 gap-6">
            {movies?.map((movie) => (
                <MovieCard
                    key = {movie.id}
                    movieId = {movie.id}
                    title = {movie.title}
                    overview = {movie.overview}
                    posterPath = {movie.poster_path}
                />
            ))}
        </div>
        </>
    )
}

export default NowPlaying;