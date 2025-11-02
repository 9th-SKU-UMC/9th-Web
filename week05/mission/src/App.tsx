import { type RouteObject, useRoutes } from "react-router-dom";
import Layout from "./layouts/Layout";
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

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      // Public
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "popular", element: <Popular /> },
      { path: "upcoming", element: <Upcoming /> },
      { path: "top-rated", element: <TopRated /> },
      { path: "now-playing", element: <NowPlaying /> },
      { path: "movie/:movieId", element: <MovieDetail /> },

      // Protected
      {
        element: <ProtectedLayout />,
        children: [{ path: "mypage", element: <MyPage /> }],
      },
    ],
  },
];

function App() {
  const routing = useRoutes(routes);
  return <AuthProvider>{routing}</AuthProvider>;
}

export default App;
