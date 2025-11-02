import { type ApiResponse, handleApiError, apiPrivate, authStorage } from "../../shared/apiConfig/apiExport";

export const logout = async (): Promise<ApiResponse> => {
    try {
        const response = await apiPrivate.post('/auth/signout');

        if (response.status === 201) {
            authStorage.logout();
        }

        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};
