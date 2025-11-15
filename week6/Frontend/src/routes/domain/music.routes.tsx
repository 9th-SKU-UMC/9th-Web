import type { RouteObject } from "react-router-dom";
import { lazy } from "react";
import { SEG, join } from "../segment";

const MusicsPage = lazy(() => import("../../Pages/music/Musics"));
const MusicDetailPage = lazy(() => import("../../Pages/music/MusicDetail"));

export const musicRoutes: RouteObject[] = [
    {
        path: SEG.MUSIC.ROOT,
        children: [
            {
                index: true,
                element: <MusicsPage />
            },
            {
                path: join(SEG.MUSIC.ROOT, SEG.MUSIC.ID),
                element: <MusicDetailPage />
            }
        ]
    }
];
