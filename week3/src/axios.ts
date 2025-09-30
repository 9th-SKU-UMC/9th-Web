import axios from "axios";

// Axios 인스턴스 생성
export const api = axios.create({
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
        accept: 'application/json',
    }
})