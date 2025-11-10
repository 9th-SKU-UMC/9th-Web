import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authStorage } from "../shared/apiConfig/authStorage";

const OAuthSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        
        // const userId: number | null = Number(params.get("id"));
        // const name: string | null = params.get("name");
        const accessToken: string | null = params.get("accessToken");
        const refreshToken: string | null = params.get("refreshToken");

        console.log("OAuthSuccess - Retrieved tokens:", { accessToken, refreshToken });

        if (accessToken && refreshToken) {
            authStorage.setToken('access', accessToken);
            authStorage.setToken('refresh', refreshToken);
            console.log("Tokens stored successfully.");
            navigate('/');
        } else {
            console.error("Access token or refresh token is missing.");
            navigate('/login'); 
        }
    }, []);

    return (
        <>
            <span>로그인 처리 중...</span>
        </>
    )
}

export default OAuthSuccess;