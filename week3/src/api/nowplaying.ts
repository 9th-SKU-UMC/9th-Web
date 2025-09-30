import { request } from "../utils/apiRequest";
import type { NowPlayingResponse } from "../types/Movie";

export const getNowPlayingMovies = async (page: number) => {
    return request<NowPlayingResponse>({
        url: "https://api.themoviedb.org/3/movie/now_playing",
        method: "GET",
        params: {
            language: "ko-KR",
            page: page,
        }
    })
}