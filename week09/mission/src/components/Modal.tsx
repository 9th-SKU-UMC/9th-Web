import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { closeModal } from "../features/modal/modalSlice";
import { clearCart } from "../features/cart/cartSlice";

const Modal = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.modal);

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleConfirm = () => {
    dispatch(clearCart());
    dispatch(closeModal());
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={handleCloseModal}
    >
      <div
        className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          장바구니를 초기화하시겠습니까?
        </h2>
        <p className="text-gray-600 mb-6">
          모든 상품이 장바구니에서 삭제됩니다.
        </p>
        <div className="flex gap-4 justify-end">
          <button
            onClick={handleCloseModal}
            className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
          >
            아니요
          </button>
          <button
            onClick={handleConfirm}
            className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
