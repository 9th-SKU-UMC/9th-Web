import { type ApiResponse, handleApiError, apiPrivate } from "../../shared/apiConfig/apiExport";
import type { User } from "../../types/user";

export const getUserInfo = async (): Promise<User> => {
    try {
        const { data } = await apiPrivate.get<ApiResponse<User>>(
            '/users/me'
        );

        console.log('getUserInfo api response:', data);

        if (!data.status || !data.data) {
            throw new Error(data.message);
        }

        return data.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
}


