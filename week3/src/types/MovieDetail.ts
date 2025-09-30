// 영화 상세 정보 타입 정의 및 크레딧 정보 포함
export type MovieDetailWithCredits = {
    id: number; // 영화 ID

    // 히어로 영역 정보
    original_title: string; // 원제  
    backdrop_path: string | null; // 배경 이미지 경로
    vote_average: number; // 평점
    release_date: string; // 개봉일
    runtime: number; // 상영 시간 (분)
    tagline: string | null; // 영화 태그라인 (짧은 설명)
    overview: string; // 줄거리

    // 크레딧 정보
    credits: {
        cast: Array<{
            id: number; // 배우 ID
            cast_id: number; // 출연 ID
            profile_path: string | null; // 배우 프로필 이미지 경로
            name: string; // 배우 이름
            character: string; // 배역 이름
            order: number; // 출연 순서
        }>;
    }
}

// 크레딧 정보
export type Cast = {
    id: number; // 배우 ID
    cast_id: number; // 출연 ID
    profile_path: string | null; // 배우 프로필 이미지 경로
    name: string; // 배우 이름
    character: string; // 배역 이름
    order: number; // 출연 순서
}