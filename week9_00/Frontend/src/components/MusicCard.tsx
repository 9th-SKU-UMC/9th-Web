import clsx from "clsx";

type LPLike = { id: number; userId: number; lpId: number; };

type MusicCardProps = {
    title: string;
    createdAt: string;
    likes?: LPLike[];
    thumbnail: string;
    onClick?: () => void;
    className?: string;
}

const minutesSince = (iso: string) => {
    const diffMs = Date.now() - new Date(iso).getTime();
    const m = Math.max(0, Math.floor(diffMs / 60000));
    return `${m}분 전`;
}

const MusicCard = ({
    title, 
    createdAt,
    likes,
    thumbnail,
    onClick,
    className
}: MusicCardProps) => {
    const likeCount = likes?.length ?? 0;

    return (
        <li
            className={clsx(
                "group relative cursor-pointer overflow-hidden",
                className
            )}
            onClick={onClick}
        >
            {/* thumbnail */}
            <div className="aspect-square">
                {thumbnail ? (
                    <img
                        src={thumbnail}
                        alt={title}
                        className="h-full w-full object-cover"
                    />
                ): (
                    <div className="flex w-full h-full items-center justify-center">
                        No Image
                    </div>
                )}

                {/* Overlay */}
                <div
                    className={clsx(
                        "pointer-events-none absolute inset-0",
                        "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                        "bg-linear-to-t from-black/70 to-transparent",
                    )}
                >
                    {/* info */}
                    <div 
                        className={clsx(
                            "pointer-events-none absolute inset-x-0 bottom-0 p-3",
                            "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                        )}
                    >
                        <div className="text-white">
                            <div className="line-clamp-2 text-sm font-medium">{title}</div>
                            <div className="mt-1 flex items-center justify-between text-xs text-white/80">
                                <span>{minutesSince(createdAt)}</span>
                                <span>❤️ {likeCount}</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </li>
    );
}

export default MusicCard;