import CartItem from "./CartItem";
import { useCartInfo } from "../hooks/useCartStore";

const CartList = () => {
  const { cartItems } = useCartInfo();

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <ul className="w-full max-w-2xl">
        {cartItems.map((item) => (
          <CartItem key={item.id} lp={item} />
        ))}
      </ul>
    </div>
  );
};

export default CartList;
