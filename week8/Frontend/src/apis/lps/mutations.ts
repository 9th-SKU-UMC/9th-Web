import { type ApiResponse, handleApiError, apiPrivate } from "../../shared/apiConfig/apiExport";
import type { 
    CreateLPPayload, CreateLPResponse,
    UpdateLPPayload, UpdateLPResponse,
} from "../../types/lp/dto";

// [LP 조회 전용 api]

// LP 생성
export const createLP = async (payload: CreateLPPayload): Promise<CreateLPResponse> => {
    try {
        const { data } = await apiPrivate.post<ApiResponse<CreateLPResponse>>(
            '/lps',
            payload
        );
        console.log('createLP api response:', data);

        if (!data.status || !data.data) {
            throw new Error(data.message);
        }
        return data.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
}

// LP 수정
export const updateLP = async (lpId: number, payload: UpdateLPPayload): Promise<UpdateLPResponse> => {
    try {
        const { data } = await apiPrivate.patch<ApiResponse<UpdateLPResponse>>(
            `/lps/${lpId}`,
            payload
        );
        console.log('updateLP api response:', data);    
        if (!data.status || !data.data) {
            throw new Error(data.message);
        }
        return data.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
}

// LP 삭제
export const deleteLP = async (lpId: number): Promise<void> => {
    try {
        const { data } = await apiPrivate.delete<ApiResponse<null>>(
            `/lps/${lpId}`
        );
        console.log('deleteLP api response:', data);
        if (!data.status) {
            throw new Error(data.message);
        }
    } catch (error) {
        handleApiError(error);
        throw error;
    }
}