export type Movie = {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    poster_path: string | null;
    vote_average: number;
    vote_count: number;
    popularity: number;

}

// 기본 응답
export type MovieResponse = {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

// 상영 중 영화 응답
export type NowPlayingResponse = {
    dates: {
        maximum: string;
        minimum: string;
    }
} & MovieResponse;

// 평점 높은 순 영화 응답
export type TopRatedResponse = MovieResponse;

// 개봉 예정 영화 응답
export type UpcomingResponse = {
    dates: {
        maximum: string;
        minimum: string;
    }
} & MovieResponse;
