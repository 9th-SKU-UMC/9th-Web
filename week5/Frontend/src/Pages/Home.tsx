import { authStorage } from "../shared/apiConfig/authStorage";

const Home = () => {
    const isLoginedIn = authStorage.isAuthenticated();
    // console.log('isLoginedIn:', isLoginedIn);

    const logout = () => {
        authStorage.logout();
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