// 경로 세그먼트 정의
export const SEG = {
    ROOT: "/",
    
    LOGIN: "/login",
    SIGNUP: "/signup",

    OAUTH: {
        GOOGLE: "/v1/auth/google/callback",
    },

    PROFILE: {
        ROOT: "/profile",
        EDIT: "edit",
        DELETE: "delete",
    },

    MUSIC: {
        ROOT: "/music",
        ID: "/:lpId", // Dynamic segment for music ID
    }
} as const;

export const join = (...segs: string[]) => segs.filter(Boolean).join('/');