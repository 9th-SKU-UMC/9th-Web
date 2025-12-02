// 경로 상수 정의
export const PATH = {
    home: () => '/',

    login: () => '/login',
    signup: () => '/signup',

    oauth: () => '/v1/auth/google/callback',

    profile: {
        view: () => '/profile',
        edit: () => '/profile/edit',
        delete: () => '/profile/delete',
    },

    music: {
        list: () => '/music',
        detail: (lpId: number) => `/music/${lpId}`,
    },

    cart: {
        list: () => '/cart',
    },
} as const;