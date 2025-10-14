import axios from "axios";

// Axios 인스턴스 생성
export const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    headers: {
        accept: 'application/json',
    }
})

