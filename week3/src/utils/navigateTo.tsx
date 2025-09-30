// URL을 변경하고 라우터에게 경로가 바뀌었다는 이벤트를 전달하는 함수
export const navigateTo = (to: string, replace = false) => {
    if (replace) {
        // 현재 히스토리 항목 덮어쓰기
        window.history.replaceState({}, "", to);
    } else {
        // 새로운 히스토리 항목을 추가
        window.history.pushState({}, "", to);
    }

    // pushState, replaceState는 popstate 이벤트를 발생시키지 않음
    // 따라서 라우터가 경로 변화를 감지할 수 있도록 커스텀 이벤트 작성
    window.dispatchEvent(new Event("locationchange")); // 경로 바뀜 알림 이벤트
}