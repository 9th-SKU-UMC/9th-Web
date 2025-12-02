import { FaShoppingCart } from "react-icons/fa";
import { useCartActions, useCartInfo } from "../hooks/useCartStore";
import cartItems from "../constants/cartItems";
import { useEffect } from "react";

const Navbar = () => {
  const { amount } = useCartInfo();
  const { calculateTotal } = useCartActions();

  useEffect(() => {
    calculateTotal();
  }, [cartItems, calculateTotal]);

  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1
        onClick={() => {
          window.location.href = "/";
        }}
        className="text-2xl font-semibold cursor-pointer"
      >
        narun
      </h1>
      <div className="flex items-center space-x-2">
        <FaShoppingCart className="text-2xl" />
        <span className="text-xl">{amount}</span>
      </div>
    </div>
  );
};

export default Navbar;
