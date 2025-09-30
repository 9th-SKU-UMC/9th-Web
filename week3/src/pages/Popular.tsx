import { useState, useEffect } from "react";
import type { Movie } from "../types/Movie";
import { getPopularMovies } from "../api/popular";
import MovieCard from "../components/MovieCard";
import LoadingSpinner from "../components/LoadingSpinner";
import PageNavigator from "../components/PageNavigator";

// 인기 영화 페이지
const Popular = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [error, setError] = useState<string|null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            const { data, error } = await getPopularMovies(page);
            
            if (error) {
                setError(error);
            } else if (data) {
                setMovies(data.results);
            }

            setLoading(false);
            console.log(data);
        }
        fetchMovies();
    }, [page]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    }

    if (error) return <p>에러 발생: {error}</p>;
    if (loading) return <LoadingSpinner />;

    return (
        <>
            <PageNavigator currentPage={page} onPageChange={handlePageChange} />
            <div className="grid grid-cols-6 gap-6">
                {movies?.map((movie) => (
                    <MovieCard
                        key = {movie.id}
                        title = {movie.title}
                        overview = {movie.overview}
                        posterPath = {movie.poster_path}
                    />
                ))}
            </div>
        </>
    )
}

export default Popular;