import type { Axios, AxiosRequestConfig } from "axios";
import { authStorage } from "./authStorage";
import { jwtDecode } from "jwt-decode";
import { getRefreshTokens } from "../../apis/auth/getRefreshTokens";

// check if the access token is expired
export function isTokenExpired(bufferSeconds:number = 5): boolean {
    const accessToken = authStorage.getToken('access');
    if (!accessToken) return true;

    const { exp } = jwtDecode<{ exp: number }>(accessToken);
    const currentTime = Math.floor(Date.now() / 1000);

    console.log('Token expiration time (exp):', exp);
    console.log('Current time:', currentTime);
    console.log('is token expired:', currentTime + bufferSeconds - exp >= 0);

    return exp <= currentTime + bufferSeconds;
}

// refresh the access token using the refresh token
let refreshPromise: Promise<void> | null = null;

export async function refreshToken(): Promise<void> {
    const refreshTokenValue = authStorage.getToken('refresh');

    // no refresh token, logout
    if (!refreshTokenValue) {
        authStorage.logout();
        return Promise.reject(new Error("No refresh token"));
    }

    // go when there's no ongoing refresh
    if (!refreshPromise) {
        refreshPromise = (async () => {
            try {
                const { accessToken, refreshToken } = await getRefreshTokens(refreshTokenValue);
                authStorage.setToken('access', accessToken);
                authStorage.setToken('refresh', refreshToken);
            } catch (error) {
                authStorage.logout();
                throw error;
            } finally {
                refreshPromise = null;
            }
        })();
    }

    return refreshPromise;
}

