import { useState, useEffect } from "react";
import { getUserInfo } from "../../apis/users/getUserInfo";
import type { User } from "../../types/user";

const Profile = () => {
    const [userInfo, setUserInfo] = useState<User | null>(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const userInfo = await getUserInfo()
                .then((data) => {
                    setUserInfo(data);
                })
        };

        fetchUserInfo();
    }, []);

    return (
        <>
            <h1>Profile Page</h1>
            <span>Welcome, {userInfo?.name}</span>
        </>
    )
};

export default Profile;