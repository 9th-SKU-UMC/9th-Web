/* eslint-disable react-refresh/only-export-components */

import {
  createBrowserRouter,
  type RouteObject,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Popular from "./pages/Popular";
import Upcoming from "./pages/Upcoming";
import TopRated from "./pages/TopRated";
import NowPlaying from "./pages/NowPlaying";
import MovieDetail from "./pages/MovieDetail";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedLayout from "./layouts/ProtectedLayout";
import { GoogleLoginRedirectPage } from "./pages/GoogleLoginRedirectPage";
import LpDetailPage from "./pages/LpDetailPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Layout from "./layouts/Layout";

const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "popular", element: <Popular /> },
      { path: "upcoming", element: <Upcoming /> },
      { path: "top-rated", element: <TopRated /> },
      { path: "now-playing", element: <NowPlaying /> },
      { path: "movie/:movieId", element: <MovieDetail /> },
      { path: "lp/:lpid", element: <LpDetailPage /> },
      { path: "v1/auth/google/callback", element: <GoogleLoginRedirectPage /> },
    ],
  },
];

const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        element: <ProtectedLayout />,
        children: [{ path: "mypage", element: <MyPage /> }],
      },
    ],
  },
];

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export default App;
