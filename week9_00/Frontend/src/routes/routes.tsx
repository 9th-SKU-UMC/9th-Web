import type { RouteObject } from "react-router-dom";
import { publicRoutes } from "./domain/public.routes";
import { profileRoutes } from "./domain/profile.routes";
import { musicRoutes } from "./domain/music.routes";
import BaseLayout from "../layouts/BaseLayout";
import ProtectedLayout from "../layouts/ProtectedLayout";

export const routes: RouteObject[] =[
    {
        path: "/",
        element: <BaseLayout />,
        errorElement: <div>Not Found</div>,
        children: [
            ...publicRoutes,
            ...musicRoutes,
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