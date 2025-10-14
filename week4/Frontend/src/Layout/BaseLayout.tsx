import { Outlet } from "react-router-dom";
import Header from "../Components/Header";

const BaseLayout = () => {
    return(
        <>
        <div className="min-h-screen w-screen bg-black text-white">
            <Header/>
            <main className="w-full px-4 pt-6 pb-16">
                <div className="mx-auto w-full max-w-[360px]">
                    <Outlet />
                </div>
            </main>
        </div>
        </>
    )
}

export default BaseLayout;