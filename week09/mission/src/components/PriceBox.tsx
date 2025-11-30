import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { openModal } from "../features/modal/modalSlice";

const PriceBox = () => {
  const { total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(openModal());
  };

  return (
    <div className="p-12 flex justify-center items-center gap-[400px]">
      <button
        onClick={handleOpenModal}
        className="border p-4 rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
      >
        장바구니 초기화
      </button>
      <div className="text-xl font-semibold">총 가격: ₩{total}</div>
    </div>
  );
};

export default PriceBox;
