import type { ApiResponse } from "../../types/ApiResponse";
import { handleApiError } from "../../shared/apiConfig/handleApiError";
import { apiPublic } from "../../shared/apiConfig/axios";
import type { RefreshTokenResponse } from "../../types/user";

export const getRefreshTokens = async (refresh: string): Promise<RefreshTokenResponse> => {
    try {
        const { data } = await apiPublic.post<ApiResponse<RefreshTokenResponse>>(
            '/auth/refresh',
            { refresh }
        );

        console.log('getRefreshTokens api response:', data);

        if (!data.status || !data.data) {
            throw new Error(data.message);
        }

        return data.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
}