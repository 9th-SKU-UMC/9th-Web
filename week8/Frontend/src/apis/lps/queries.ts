import { type ApiResponse, handleApiError, apiPrivate } from "../../shared/apiConfig/apiExport";
import type { 
    GetLPsPayload, LPsResponse, // Default DTOs
    GetLPsPayloadByUser, LPsResponseByUser,  // User-specific DTOs
    GetMyLPsPayload, MyLPsResponse,  // My LPs DTOs
    GetLPsPayloadByTag, LPsResponseByTag,  // Tag-specific DTOs
    LPDetailResponse  // LP Detail DTO
} from "../../types/lp/dto";

// [LP 생성, 수정, 삭제 api]

// Default : LP 목록 조회
export const getLPs = async (payload: GetLPsPayload): Promise<LPsResponse> => {
    try {
        const { data } = await apiPrivate.get<ApiResponse<LPsResponse>>(
            '/lps'
            , { params: payload }
        );

        console.log('getLPs api response:', data);

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
export const getLPsByUser = async (userId:number, payload: GetLPsPayloadByUser): Promise<LPsResponseByUser> => {
    try {
        const { data } = await apiPrivate.get<ApiResponse<LPsResponseByUser>>(
            `/lps/user/${userId}`
            , { params: payload }
        );
        console.log('getLPsByUser api response:', data);

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
export const getMyLPs = async (payload: GetMyLPsPayload): Promise<MyLPsResponse> => {
    try {
        const { data } = await apiPrivate.get<ApiResponse<MyLPsResponse>>(
            '/lps/user'
            , { params: payload }
        );
        console.log('getMyLPs api response:', data);
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
export const getLPsByTag = async (tagName:string, payload: GetLPsPayloadByTag): Promise<LPsResponseByTag> => {
    try {
        const { data } = await apiPrivate.get<ApiResponse<LPsResponseByTag>>(
            `/tags/${encodeURIComponent(tagName)}/lps`
            , { params: payload }
        );
        console.log('getLPsByTag api response:', data);
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
export const getLPDetail = async (lpId: number): Promise<LPDetailResponse> => {
    try {
        const { data } = await apiPrivate.get<ApiResponse<LPDetailResponse>>(
            `/lps/${lpId}`
        );  
        console.log('getLPDetail api response:', data);

        if (!data.status || !data.data) {
            throw new Error(data.message);
        }
        return data.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }   
}