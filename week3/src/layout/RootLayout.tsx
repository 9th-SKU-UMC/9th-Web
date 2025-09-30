import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const RootLayout = () => {
    return (
        <>
        <div className="min-h-screen">
            <header>
                <Navbar />
            </header>
            <main className="max-w-6xl mx-auto px-4 py-8">
                <Outlet />
            </main>
        </div>
        </>
    )
}

export default RootLayout;