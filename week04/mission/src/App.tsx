import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Popular from "./pages/Popular";
import Upcoming from "./pages/Upcoming";
import TopRated from "./pages/TopRated";
import NowPlaying from "./pages/NowPlaying";
import MovieDetail from "./pages/MovieDetail";
import Login from "./pages/Login/LoginPage";
import Signup from "./pages/Login/SignupPage";

function App() {
  console.log(import.meta.env.VITE_TMDB_KEY);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="popular" element={<Popular />}></Route>
          <Route path="upcoming" element={<Upcoming />}></Route>
          <Route path="top-rated" element={<TopRated />}></Route>
          <Route path="now-playing" element={<NowPlaying />}></Route>
          <Route path="movie/:movieId" element={<MovieDetail />}></Route>
        </Route>
      </Routes>
    </>
  );
}
export default App;
