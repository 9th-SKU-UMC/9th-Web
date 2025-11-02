import type { ApiResponse } from "../../types/ApiResponse";
import { handleApiError } from "../../shared/apiConfig/handleApiError";
import { apiPublic } from "../../shared/apiConfig/axios";
import type { LoginPayload, LoginResponse } from "../../types/user";
import { authStorage } from "../../shared/apiConfig/authStorage";

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
    try {
        const { data } = await apiPublic.post<ApiResponse<LoginResponse>>(
            '/auth/signin',
            payload
        );

        console.log('login api response:', data);

        if (!data.status || !data.data) {
            throw new Error(data.message);
        }

        const { accessToken, refreshToken } = data.data;
        authStorage.setToken('access', accessToken);
        authStorage.setToken('refresh', refreshToken);

        return data.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
}