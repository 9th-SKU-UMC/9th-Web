import { type ApiResponse, handleApiError, apiPublic, authStorage } from "../../shared/apiConfig/apiExport";
import type { LoginPayload, LoginResponse } from "../../types/user";

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
        authStorage.setUserInfo({ id: data.data.id, name: data.data.name });

        return data.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
}