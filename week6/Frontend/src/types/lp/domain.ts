// Domain types for LP tags
export type LPTag = {
    id: number;
    name: string;
}

// Domain types for LP likes
export type LPLike = {
    id: number;
    userId: number;
    lpId: number;
}

// Domain type for author information
export type LPAuthor = {
    id: number;
    name: string;
    email: string;
    bio?: string;
    avatar?: string;
    createdAt: string;
    updatedAt: string;
}

// Domain types for LP posts
export type LPPost = {
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    published: boolean;
    authorId: number;
    createdAt: string;  
    updatedAt: string;
    tags?: LPTag[];
    likes?: LPLike[];
}

// Default: LP 목록 조회 요청 DTO 
export type GetLPsPayload = {
    cursor?: number;
    limit?: number;
    search?: string;
    order?: 'asc' | 'desc';
}

// Default: LP 목록 조회 응답 DTO
export type LPsResponse = {
    data: LPPost[];
    nextCursor: number | null;
    hasNext: boolean;
}

// Req DTO: 특정 유저가 생성한 LP 목록 조회
export type GetLpsPayloadByUser = GetLPsPayload & {
    userId: number;
}

// Res DTO: 특정 유저가 생성한 LP 목록 조회
export type LPsResponseByUser = LPsResponse;

// Req DTO: 내가 생성한 LP 목록 조회
export type GetMyLpsPayload = GetLPsPayload;

// Res DTO: 내가 생성한 LP 목록 조회
export type MyLPsResponse = LPsResponse;

// Req DTO: 특정 태그 관련 LP 목록 조회
export type GetLpsPayloadByTag = GetLPsPayload & {
    tagName: string;
}

// Res DTO: 특정 태그 관련 LP 목록 조회
export type LPsResponseByTag = LPsResponse;

// Res DTO: LP 상세 조회
export type LPDetailResponse = LPsResponse & {
    author: LPAuthor;
}

// --- get 이외 요청
// Req DTO: LP 생성 요청
export type CreateLPPayload = {
    title: string;
    content: string;
    thumbnail: string;
    tags?: string[];
    published: boolean;
}

// Res DTO: LP 생성 응답
export type CreateLPResponse = Omit<LPPost, 'tags' | 'likes'>;

// Req DTO: LP 수정 요청
export type UpdateLPPayload = Partial<CreateLPPayload>;

// Res DTO: LP 수정 응답
export type UpdateLPResponse = Partial<CreateLPResponse>;

// Req DTO: LP 삭제 요청
export type DeleteLPPayload = {
    lpId: number;
}