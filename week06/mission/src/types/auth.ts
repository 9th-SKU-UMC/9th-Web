import type { CommonResponse } from "./common";

// 회원가입 요청/응답 타입
export type RequestSignupDto = {
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  password: string;
};

export type ResponseSignupDto = CommonResponse<{
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avator: string | null;
  createdAt: string;
  updatedAt: string;
}>;

// 로그인 요청/응답 타입
export type RequestSigninDto = {
  email: string;
  password: string;
};

export type ResponseSigninDto = CommonResponse<{
  id: number;
  name: string;
  accessToken: string;
  refreshToken: string;
}>;

// 내 정보 조회 응답 타입
export type ResponseMyInfoDto = CommonResponse<{
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avator: string | null;
  createdAt: string;
  updatedAt: string;
}>;
