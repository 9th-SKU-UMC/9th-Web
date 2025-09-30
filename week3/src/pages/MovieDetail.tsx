import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetail } from '../api/detail';
import type { MovieDetailWithCredits } from '../types/MovieDetail';
import type { Cast } from '../types/MovieDetail';
import LoadingSpinner from '../components/LoadingSpinner';
import CastProfile from '../components/CastProfile';

const MovieDetail = () => {
    const { movieId } = useParams<{ movieId: string }>();

    const [movieDetail, setMovieDetail] = useState<MovieDetailWithCredits | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMovieDetail = async () => {
            if (movieId) {
                setLoading(true);
                const { data, error } = await getMovieDetail(Number(movieId));

                if (error) {
                    setError(error);
                } else if (data) {
                    setMovieDetail(data);
                }

                setLoading(false);
                console.log(data);
            }
        }
        fetchMovieDetail();
    }, [movieId])

    if (error) return <p>에러 발생: {error}</p>
    if (loading) return <LoadingSpinner />;

    return (
        <>
        <div className="bg-black text-white min-h-screen">
            {/* 상단 배너 */}
            <div className="relative">
                <img
                    src = {`https://image.tmdb.org/t/p/w500${movieDetail?.backdrop_path}`}
                    alt = {movieDetail?.original_title}
                    className="w-full h-[400px] object-cover opacity-50"

                />
                {/* 기본 정보 */}
                <div className="absolute inset-0 flex flex-col justify-end items-start text-left p-8 bg-gradient-to-t from-black via-transparent">
                    <h1 className="text-4xl font-bold">{movieDetail?.original_title}</h1>
                    <div className="mt-2 text-sm text-gray-300 space-y-1">
                        <p>평균 {movieDetail?.vote_average}</p>
                        <p className="mr-4">{movieDetail?.release_date}</p>
                        <p>{movieDetail?.runtime}분</p>
                    </div>
                    <p className="mt-4 text-lg">{movieDetail?.tagline}</p>
                    <p className="mt-2 text-sm max-w-3xl text-gray-200">{movieDetail?.overview}</p>
                </div>
            </div>

            {/* 출연진 */}
            <div className="p-8">
                <h2 className="text-2xl font-bold mb-6">감독/출연</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-6">
                    {movieDetail?.credits.cast.map((cast: Cast) => (
                        <CastProfile key={cast.cast_id} cast={cast} />
                    ))}
                </div>
            </div>

        </div>
        </>
    )
}

export default MovieDetail;