import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import BaseLayout from './Layout/BaseLayout'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'

const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    errorElement: <div>에러 발생</div>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "signup",
        element: <Signup />,
      }
    ]
  }
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
