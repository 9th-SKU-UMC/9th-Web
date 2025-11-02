import axios from "axios";
import { authStorage } from "./authStorage";
import { isTokenExpired, refreshToken } from "./tokenUtils";

const baseURL = import.meta.env.VITE_APP_API_URL;

// public axios instance
export const apiPublic = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
});

// private axios instance with token refresh logic
export const apiPrivate = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
});

// interceptors for apiPrivate to handle token expiration and refreshing
apiPrivate.interceptors.request.use(
    async (config) => {
        if (!config) return Promise.reject(new Error("No config")); // type safety

        // skip refresh for token when calling refresh endpoint
        if (config.url?.includes('/auth/refresh')) return config;

        const token = authStorage.getToken('access');

        // if token is expired, refresh it
        if (token && isTokenExpired()) {
            await refreshToken();
            const newAccess = authStorage.getToken('access');
            if (newAccess) {
                config.headers.Authorization = `Bearer ${newAccess}`;
            }
            console.log('apiPrivate - Token refreshed in request interceptor');
            return config;
        }

        // if token is valid, attach it to headers
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

apiPrivate.interceptors.response.use(
    (response) => response,
    async (error) => {
        const original = error.config; // 원본 요청

        if (error.response?.status === 401 && !original._retry) {
            // to prevent infinite loop
            original._retry = true;

            try {
                await refreshToken();
                const accessToken = authStorage.getToken('access');
                if (accessToken) {
                    original.headers.Authorization = `Bearer ${accessToken}`;
                }
                console.log('apiPrivate - Token refreshed in response interceptor');
                return apiPrivate(original);
            } catch (err) {
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);