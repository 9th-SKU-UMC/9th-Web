import type { RouteObject } from "react-router-dom";
import { lazy } from "react";
import { SEG, join } from "../segment";

const ProfilePage = lazy(() => import("../../Pages/Profile/Profile")); // 유저 정보
const EditProfilePage = lazy(() => import("../../Pages/Profile/EditProfile")); // 유저 정보 수정
const DeleteProfilePage = lazy(() => import("../../Pages/Profile/DeleteProfile")); // 회원 탈퇴

// 프로필 관련 라우트 정의
export const profileRoutes: RouteObject[] = [
    {
        path: SEG.PROFILE.ROOT,
        element: <ProfilePage />
    },
    {
        path: join(SEG.PROFILE.ROOT, SEG.PROFILE.EDIT),
        element: <EditProfilePage />
    },
    {
        path: join(SEG.PROFILE.ROOT, SEG.PROFILE.DELETE),
        element: <DeleteProfilePage />
    }
]