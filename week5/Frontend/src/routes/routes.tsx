import type { RouteObject } from "react-router-dom";
import { publicRoutes } from "./domain/public.routes";
import { profileRoutes } from "./domain/profile.routes";
import BaseLayout from "../Layout/BaseLayout";
import ProtectedLayout from "../Layout/ProtectedLayout";

export const routes: RouteObject[] =[
    {
        path: "/",
        element: <BaseLayout />,
        errorElement: <div>Not Found</div>,
        children: [
            ...publicRoutes,
            {
                element: <ProtectedLayout />,
                children: [
                    ...profileRoutes
                ]
            },
            {
                path: "*",
                element: <div>Not Found</div>,
            }
        ]
    }
]