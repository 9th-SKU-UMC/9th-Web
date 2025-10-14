const ErrorMessage = ({message}: {message: string}) => {
    return(
        <>
            <p>이런, 알 수 없는 이유로 페이지를 로드할 수 없네요.</p>
            <p>잠시 후 다시 시도해주세요.</p>
            <p>에러 메시지: {message}</p>
        </>
    )
}

export default ErrorMessage;