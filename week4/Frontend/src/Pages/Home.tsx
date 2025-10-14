const Home = () => {
    const isLoginedIn = Boolean(localStorage.getItem('accessToken'));
    console.log('isLoginedIn:', isLoginedIn);

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.reload(); // 페이지 새로고침
    }

    return(
        <>
        {isLoginedIn ? (
            <>
                <p>로그인 상태입니다.</p>
                <button onClick={logout}>로그아웃하기</button>
            </>
        ) : (
            <p>로그아웃 상태입니다.</p>
        )}
        </>
    )
}

export default Home;