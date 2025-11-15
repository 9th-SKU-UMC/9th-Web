import { type ApiResponse, handleApiError, apiPrivate } from "../../shared/apiConfig/apiExport";
import type { 
    GetLpsPayload, LPsResponse, // Default DTOs
    GetLpsPayloadByUser, LPsResponseByUser,  // User-specific DTOs
    GetMyLpsPayload, MyLPsResponse,  // My LPs DTOs
    GetLpsPayloadByTag, LPsResponseByTag,  // Tag-specific DTOs
    LPDetailResponse  // LP Detail DTO
} from "../../types/lp/DTO";

// Default : LP 목록 조회
export const getLps = async (payload: GetLpsPayload): Promise<LPsResponse> => {
    try {
        const { data } = await apiPrivate.get<ApiResponse<LPsResponse>>(
            '/lps'
            , { params: payload }
        );

        console.log('getLps api response:', data);

        if (!data.status || !data.data) {
            throw new Error(data.message);
        }

        return data.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
}

// 특정 유저가 생성한 LP 목록 조회
export const getLpsByUser = async (userId:number, payload: GetLpsPayloadByUser): Promise<LPsResponseByUser> => {
    try {
        const { data } = await apiPrivate.get<ApiResponse<LPsResponseByUser>>(
            `/lps/user/${userId}`
            , { params: payload }
        );
        console.log('getLpsByUser api response:', data);

        if (!data.status || !data.data) {
            throw new Error(data.message);
        }
        return data.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
}

// 내가 생성한 LP 목록 조회
export const getMyLps = async (payload: GetMyLpsPayload): Promise<MyLPsResponse> => {
    try {
        const { data } = await apiPrivate.get<ApiResponse<MyLPsResponse>>(
            '/lps/user'
            , { params: payload }
        );
        console.log('getMyLps api response:', data);
        if (!data.status || !data.data) {
            throw new Error(data.message);
        }
        return data.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
}

// 특정 태그 관련 LP 목록 조회
export const getLpsByTag = async (tagName:string, payload: GetLpsPayloadByTag): Promise<LPsResponseByTag> => {
    try {
        const { data } = await apiPrivate.get<ApiResponse<LPsResponseByTag>>(
            `/tags/${encodeURIComponent(tagName)}/lps`
            , { params: payload }
        );
        console.log('getLpsByTag api response:', data);
        if (!data.status || !data.data) {
            throw new Error(data.message);
        }
        return data.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
}

// LP 상세 조회
export const getLpDetail = async (lpId: number): Promise<LPDetailResponse> => {
    try {
        const { data } = await apiPrivate.get<ApiResponse<LPDetailResponse>>(
            `/lps/${lpId}`
        );  
        console.log('getLpDetail api response:', data);

        if (!data.status || !data.data) {
            throw new Error(data.message);
        }
        return data.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }   
}

