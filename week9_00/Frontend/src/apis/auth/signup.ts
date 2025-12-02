import { type ApiResponse, handleApiError, apiPublic } from "../../shared/apiConfig/apiExport";
import type { SignupPayload, SignupResponse } from "../../types/user";

export const signup = async (payload: SignupPayload): Promise<SignupResponse> => {
    try {
        const { data } = await apiPublic.post<ApiResponse<SignupResponse>>(
            '/auth/signup',
            payload
        );

        console.log('signup api response:', data);

        if (!data.status || !data.data) {
            throw new Error(data.message);
        }

        return data.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }   
}