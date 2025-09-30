import { request } from "../utils/apiRequest";
import type { TopRatedResponse } from "../types/Movie";

// 평점이 높은 영화 목록 호출
export const getTopRatedMovies = async (page: number) => {
    return request<TopRatedResponse>({
        url: "https://api.themoviedb.org/3/movie/top_rated",
        method: "GET",
        params: {
            language: "ko-KR",
            page: page,
        }
    });
};