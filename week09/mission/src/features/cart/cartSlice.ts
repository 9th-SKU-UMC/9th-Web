import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import cartItems from "../../constants/cartItems";
import type { CartItems } from "../../types/cart";

export interface CartState {
  cartItems: CartItems;
  amount: number;
  total: number;
}

const initialState: CartState = {
  cartItems: cartItems,
  amount: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increase(state, action: PayloadAction<{ id: string }>) {
      const item = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (item) {
        item.amount += 1;
      }
    },

    decrease(state, action: PayloadAction<{ id: string }>) {
      const item = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (item) {
        item.amount -= 1;
      }
    },

    removeItem(state, action: PayloadAction<{ id: string }>) {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
    },

    clearCart(state) {
      state.cartItems = [];
    },

    calculateTotal(state) {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
});

const cartReducer = cartSlice.reducer;

export const { increase, decrease, removeItem, clearCart, calculateTotal } =
  cartSlice.actions;

export default cartReducer;
