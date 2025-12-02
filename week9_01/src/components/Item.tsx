import type { CartItem } from "../types/domain";
import Counter from "./Counter";

type ItemProps = {
    item: CartItem;
    onRemove?: () => void;
}

const Item = ({ item, onRemove }: ItemProps) => {
    return (
        <>
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
                {/* 썸네일 */}
                <div className="w-20 h-20 rounded-md overflow-hidden shrink-0">
                    <img 
                        src={item.img} 
                        alt={item.title} 
                        className="w-full h-full object-cover block" 
                    />
                </div>

                {/* 제목, 가수, 가격 */}
                <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-bold">{item.title}</h3>
                    <p className="text-xs text-gray-500">{item.singer}</p>
                    <p className="text-xs font-bold">${item.price}</p>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <Counter id={item.id} />
                {onRemove && (
                    <button
                        onClick={onRemove}
                        className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                    >
                        삭제
                    </button>
                )}
            </div>
        </div>
        </>
    )
}

export default Item;