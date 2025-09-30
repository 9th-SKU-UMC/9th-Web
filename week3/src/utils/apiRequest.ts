import type { AxiosRequestConfig } from "axios";
import { api } from "../axios";

export type ApiResponse<T>= {
    data: T | null;
    error: string | null;
}

export const request = async <T>(
    config: AxiosRequestConfig
    ) : Promise<ApiResponse<T>> => {
    try {
        const response = await api.request<T>(config);
        return {
            data: response.data,
            error: null,
        }
    } catch (error: any) {
        const message =
            error.response?.data?.status_message ||
            error.message ||
            "알 수 없는 오류가 발생했습니다.";
        
        return { 
            data: null,
            error: message,
        }

    }
}