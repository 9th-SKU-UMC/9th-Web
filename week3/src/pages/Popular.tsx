import { useState, useEffect } from "react";
import type { Movie, MovieResponse } from "../types/Movie";
// import { getPopularMovies } from "../api/popular";
import useCustomFetch from "../hooks/useCustomFetch";
import MovieCard from "../components/MovieCard";
import LoadingSpinner from "../components/LoadingSpinner";
import PageNavigator from "../components/PageNavigator";

// 인기 영화 페이지
const Popular = () => {
    const [page, setPage] = useState<number>(1);

    const { data, error, loading } = useCustomFetch<MovieResponse>(
        {
            url: "/movie/popular",
            method: "GET",
            params: {
                language: "ko-KR",
                page: page,
            }
        },
        [page]
    )

    const movies: Movie[] = data?.results || [];

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    }

    if (error) return <p>에러 발생: {error.message}</p>;
    if (loading) return <LoadingSpinner />;

    return (
        <>
            <PageNavigator currentPage={page} totalPages={data?.total_pages} onPageChange={handlePageChange} />
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

export default Popular;