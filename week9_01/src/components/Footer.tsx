import clsx from "clsx";
import Item from "./Item";
import useModalStore from "../store/useModalStore";
import useCartStore from "../store/useCartStore";

type FooterProps = {
    isOpen: boolean;
    onClose: () => void;
}

const Footer = ({ isOpen, onClose }: FooterProps) => {
    const items = useCartStore((state) => state.items);
    const itemsInCart = items.filter((item) => item.amount > 0);
    const totalAmount = useCartStore((state) => state.amount);
    const totalPrice = useCartStore((state) => state.total);

    const onDeleteAll = () => {
        useModalStore.getState().openModal();
    }

    return (
        <>
            <div 
                className={clsx(
                    "fixed bottom-0 left-0 w-full p-2 bg-white shadow-[0_-8px_25px_rgba(0,0,0,0.1)] z-50 transition-transform duration-300 ease-in-out",
                    isOpen ? "translate-y-0" : "translate-y-full"
                )}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex flex-col h-80">
                    <header className="h-14 flex items-center justify-between border-b border-gray-200">
                        <h2 className="text-lg font-semibold">장바구니</h2>
                        <span onClick={onClose} className="cursor-pointer">X</span>
                    </header>
                    <div className="flex-1 overflow-y-auto p-2">
                        {itemsInCart.length === 0 ? (
                            <p className="text-sm text-gray-400 text-center mt-4">
                                장바구니에 담긴 상품이 없습니다.
                            </p>
                        ) : (
                            itemsInCart.map((item) => (
                                <Item
                                    key={item.id}
                                    item={item}
                                    onRemove={() => useCartStore.getState().removeItem(item.id)}
                                />
                            ))
                        )}
                    </div>
                    <div className="w-full flex justify-between">
                        <div className="flex gap-4">
                            <span>전체 수량: {totalAmount}</span>
                            <span>총 금액: {totalPrice}</span>
                        </div>
                        <button onClick={onDeleteAll} className="border border-gray-400 rounded-md p-3 cursor-pointer">전체 삭제</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Footer;
