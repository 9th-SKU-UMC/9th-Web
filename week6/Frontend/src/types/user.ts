// User Type Definitions
export type User = {
    id: number;
    name: string;
    email: string;
    bio?: string;
    avatar?: string;
    createdAt: Date | string;
    updatedAt: Date | string;
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
    bio?: string;
    avatar?: string;
    password: string;
}

// (2) response
export type SignupResponse = User;

// 토큰 재발급 관련 DTO
export type RefreshTokenResponse = {
    id: number;
    name: string;
    accessToken: string;
    refreshToken: string;
}
