import type { ApiResponse } from "../../types/ApiResponse";
import { handleApiError } from "../../shared/apiConfig/handleApiError";
import { apiPrivate } from "../../shared/apiConfig/axios";
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