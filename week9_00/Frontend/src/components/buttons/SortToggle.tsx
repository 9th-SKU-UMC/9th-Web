import clsx from "clsx";

type SortType = "asc" | "desc";

interface SortToggleProps {
    sort: SortType;
    onChange: (newSort: SortType) => void;
    className?: string;
}

const defaultStyle = "px-3 py-1 text-sm transition cursor-pointer";
const activeStyle = "bg-white text-black";
const inactiveStyle = "bg-black text-white hover:text-pink-500";

const SortToggle = ({
    sort,
    onChange,
    className
}: SortToggleProps) => {
    return (
        <>
        <div className={clsx("inline-flex overflow-hidden rounded-l-lg border border-white/20", className)}>
            <button
                type="button"
                onClick={()=>onChange("asc")}
                className={clsx(
                    defaultStyle,
                    sort === "asc" ? activeStyle : inactiveStyle,
                )}
            >
                오래된 순
            </button>

            <button
                type="button"
                onClick={()=>onChange("desc")}
                className={clsx(
                    defaultStyle,
                    sort === "desc" ? activeStyle : inactiveStyle,
                )}
            >
                최신 순
            </button>

        </div>
        </>
    )
};

export default SortToggle;