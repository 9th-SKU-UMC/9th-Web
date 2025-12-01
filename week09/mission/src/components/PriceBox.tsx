import { useModalActions } from "../hooks/useModalStore";
import { useCartInfo } from "../hooks/useCartStore";

const PriceBox = () => {
  const { total } = useCartInfo();
  const { open } = useModalActions();

  return (
    <div className="p-12 flex justify-center items-center gap-[400px]">
      <button
        onClick={open}
        className="border p-4 rounded-md cursor-pointer hover:bg-gray-100"
      >
        장바구니 초기화
      </button>
      <div className="text-xl font-semibold">총 가격: ₩{total}</div>
    </div>
  );
};

export default PriceBox;
