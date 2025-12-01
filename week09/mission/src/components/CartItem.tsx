import { FaMinus, FaPlus } from "react-icons/fa";
import type { Lp } from "../types/cart";
import { useCartActions } from "../hooks/useCartStore";

interface CartItemProps {
  lp: Lp;
}

const CartItem = ({ lp }: CartItemProps) => {
  const { increase, decrease, removeItem } = useCartActions();

  const handleIncrease = () => increase(lp.id);

  const handleDecrease = () => {
    if (lp.amount === 1) {
      removeItem(lp.id);
      return;
    }
    decrease(lp.id);
  };

  return (
    <li className="flex items-center p-4 border-b border-gray-200">
      <img src={lp.img} className="w-20 h-20 object-cover rounded mr-4" />
      <div className="flex-1">
        <h3 className="text-xl font-semibold">{lp.title}</h3>
        <p className="text-sm text-gray-600">{lp.singer}</p>
        <p className="text-sm font-bold text-gray-600">{lp.price} 원</p>
      </div>
      <div className="flex items-center">
        <button
          onClick={handleDecrease}
          className="px-3 py-2 bg-gray-200 rounded-l"
        >
          <FaMinus />
        </button>
        <span className="px-4 py-[3px] border-y">{lp.amount}</span>
        <button
          onClick={handleIncrease}
          className="px-3 py-2 bg-gray-200 rounded-r"
        >
          <FaPlus />
        </button>
      </div>
    </li>
  );
};

export default CartItem;
