import useModalStore from "../store/useModalStore";
import useCartStore from "../store/useCartStore";

const Modal = () => {
    const closeModal = useModalStore((state) => state.closeModal);

    const handleDeleteAllItems = () => {
        useCartStore.getState().clearCart();
        closeModal(false);
    };

    return (
        <>
        <div className="fixed inset-0 z-60 flex justify-center items-center bg-black/50">
            <div className="w-70 h-40 flex flex-col items-center justify-center text-xs gap-2 bg-white shadow-2xl rounded-md">
                <p className="text-lg">정말 삭제하시겠습니까?</p>
                <div className="flex gap-4 items-center">
                    <button 
                        onClick={handleDeleteAllItems}
                        className="bg-red-800 rounded-md p-2 text-white text-md cursor-pointer"
                    >
                        네
                    </button>
                    <button 
                        onClick={() => closeModal(false)}
                        className="bg-gray-400 rounded-md p-2 text-md cursor-pointer"
                    >
                        아니요
                    </button>
                </div>
            </div>
        </div>
        </>
    )
}

export default Modal;