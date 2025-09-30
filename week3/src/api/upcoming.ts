import { request } from "../utils/apiRequest";
import type { UpcomingResponse } from "../types/Movie";

// 개봉 예정 영화 목록 호출
export const getUpcomingMovies = async (page: number) => {
    return request<UpcomingResponse>({
        url: "https://api.themoviedb.org/3/movie/upcoming",
        method: "GET",
        params: {
            language: "ko-KR",
            page: page,
        }
    });
};
