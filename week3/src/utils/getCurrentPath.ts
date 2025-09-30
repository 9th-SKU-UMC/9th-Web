// 현재 브라우저 주소창의 경로(pathname)을 반환
// ex: https://example.com/moni -> "/moni" 반환
export const getCurrentPath = (): string => {
    return window.location.pathname;
}