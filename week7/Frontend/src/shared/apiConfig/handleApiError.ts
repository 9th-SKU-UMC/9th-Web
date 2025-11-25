// handle API errors and display appropriate messages
export const handleApiError = (error: any) => {
    // 표준 응답
    if (error?.response?.data?.message) {
        alert(`Error: ${error.response.data.message}`);
    }

    // 응답 구조가 예상과 다를 때
    if (error?.message) {
        alert(`Error: ${error.message}`);
    }

    // 기타 알 수 없는 오류
    else {
        alert(`Error: 알 수 없는 오류가 발생했습니다.`);
    }

    console.error('API Error Details:', error);
}