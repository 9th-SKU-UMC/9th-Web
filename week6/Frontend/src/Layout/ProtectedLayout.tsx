import { Navigate, Outlet, useLocation } from "react-router-dom";
import { authStorage } from "../shared/apiConfig/authStorage";

const ProtectedLayout = () => {
    const location = useLocation();

    console.log("ProtectedLayout - isAuthenticated:", authStorage.isAuthenticated());

    if (authStorage.isAuthenticated() === false) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return (
        <>
        <span>Protected Layout</span>
        <Outlet />
        </>
    )
}

export default ProtectedLayout;