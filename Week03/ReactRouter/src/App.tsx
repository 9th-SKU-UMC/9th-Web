import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./Pages/Home";
import Page2 from "./Pages/Page2";
import RootLayout from "./Layouts/RootLayout";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "2", element: <Page2 /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
