import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import RootLayout from './layout/RootLayout';
import Popular from './pages/Popular';
import NowPlaying from './pages/NowPlaying';
import Upcoming from './pages/Upcoming';
import TopRated from './pages/TopRated';
import MovieDetail from './pages/MovieDetail';

// 2. 경로(path)와 보여줄 화면(element)를 정의
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'popular',
        element: <Popular />
      },
      {
        path: 'now-playing',
        element: <NowPlaying />
      },
      {
        path: 'upcoming',
        element: <Upcoming />
      },
      {
        path: 'top-rated',
        element: <TopRated />
      },
      {
        path: 'detail/:movieId',
        element: <MovieDetail />
      }
    ],
  },
]);

// 3. RouterProvider로 router 전달
function App() {
  return <RouterProvider router={router} />
}

export default App;