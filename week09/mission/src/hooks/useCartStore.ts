import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import cartItems from "../constants/cartItems";
import type { CartItems } from "../types/cart";
import { useShallow } from "zustand/shallow";

interface CartActions {
  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  calculateTotal: () => void;
}

interface CartState {
  cartItems: CartItems;
  amount: number;
  total: number;
  actions: CartActions;
}

export const useCartStore = create<CartState>()(
  immer((set) => ({
    cartItems: cartItems,
    amount: 0,
    total: 0,
    actions: {
      increase: (id) =>
        set((state) => {
          const item = state.cartItems.find((i) => i.id === id);
          if (item) item.amount += 1;
        }),
      decrease: (id) =>
        set((state) => {
          const item = state.cartItems.find((i) => i.id === id);
          if (item && item.amount > 0) item.amount -= 1;
        }),
      removeItem: (id) =>
        set((state) => {
          state.cartItems = state.cartItems.filter((i) => i.id !== id);
        }),
      clearCart: () =>
        set((state) => {
          state.cartItems = [];
        }),
      calculateTotal: () =>
        set((state) => {
          let amount = 0;
          let total = 0;
          state.cartItems.forEach((item) => {
            amount += item.amount;
            total += item.amount * item.price;
          });
          state.amount = amount;
          state.total = total;
        }),
    },
  }))
);

export const useCartInfo = () =>
  useCartStore(
    useShallow((state) => ({
      cartItems: state.cartItems,
      amount: state.amount,
      total: state.total,
    }))
  );

export const useCartActions = () => useCartStore((state) => state.actions);
