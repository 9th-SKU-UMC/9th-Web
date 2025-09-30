type PageNavigatorProps = {
    currentPage: number;
    totalPages?: number;
    onPageChange: (page: number) => void;
}

// 페이지 네비게이터 컴포넌트
const PageNavigator = ({ currentPage, totalPages, onPageChange }: PageNavigatorProps) => {

    const handlePrevClick = () => {
        if (currentPage > 1) return onPageChange(currentPage - 1); // 현재 페이지가 1보다 크면 이전 페이지로 이동
        return onPageChange(currentPage);
    }

    const handleNextClick = () => {
        if (totalPages && currentPage < totalPages) {
            return onPageChange(currentPage + 1); // 현재 페이지가 총 페이지 수보다 작으면 다음 페이지로 이동
        }
        return onPageChange(currentPage);
    }

    return (
        <>
        <div className="flex justify-center items-center gap-4 my-8">
            {currentPage !==1 && (
                <button type="button" onClick={handlePrevClick}>이전</button>
            )}
            <div>{currentPage}</div>
            <button type="button" onClick={handleNextClick}>다음</button>
        </div>
        </>
    )
}

export default PageNavigator;