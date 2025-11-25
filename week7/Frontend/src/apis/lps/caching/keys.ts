import type {
    GetLPsPayload,
    GetLPsPayloadByUser,
    GetMyLPsPayload,
    GetLPsPayloadByTag,
} from "../../../types/lp/dto";

// Tanstack QUery key 전용 유틸 

export const lpKeys = {
    all: ['lps'] as const,
    list: (q?: GetLPsPayload) => [...lpKeys.all, 'list', q] as const,
    infiniteList: (q?: Omit<GetLPsPayload, 'cursor'>) => [...lpKeys.all, 'infiniteList', q] as const,
    byUser: (q?: GetLPsPayloadByUser) => [...lpKeys.all, 'byUser', q] as const,
    mine: (q?: GetMyLPsPayload) => [...lpKeys.all, 'mine', q] as const,
    byTag: (tagName: string, q?: GetLPsPayloadByTag) => [...lpKeys.all, 'byTag', tagName, q] as const,
    detail: (lpId: number | string) => [...lpKeys.all, 'detail', lpId] as const,
}