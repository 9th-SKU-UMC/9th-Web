// 도메인 모델
export type User = {
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    createdAt: Date;
    updatedAt: Date;
}

// 로그인 관련 DTO
// (1) request
export type LoginPayload = {
    email: string;
    password: string;
}

// (2) response
export type LoginResponse = {
    id: number;
    name: string;
    accessToken: string;
    refreshToken: string;
}

// 회원가입 관련 DTO
// (1) request
export type SignupPayload = {
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    password: string;
}

// (2) response
export type SignupResponse = User;

