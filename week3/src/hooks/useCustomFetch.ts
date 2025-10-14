import { useEffect, useState } from "react";
import { api } from "../axios";
import type { AxiosRequestConfig, AxiosError } from "axios";

export type ApiResponseIncludeLoading<T> = {
    data: T | null;
    error: AxiosError | null;
    loading: boolean;
}

// 커스텀 훅: 데이터 fetch 기능
const useCustomFetch = <T,>(
    config: AxiosRequestConfig,
    deps: any[] = []
): ApiResponseIncludeLoading<T> => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<AxiosError | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await api.request<T>(config);
                setData(response?.data || null);
                setError(null);
            } catch (error) {
                setError(error as AxiosError);
                setData(null);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, deps);

    return { data, error, loading };
};

export default useCustomFetch;