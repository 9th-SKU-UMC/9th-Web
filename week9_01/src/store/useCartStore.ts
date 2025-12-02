import { create } from "zustand";
import type { CartItem } from "../types/domain";
import cartItems from "../constants/cartItem";

type CartState = {
    items: CartItem[]; // id, title, singer, price, img, amount
    amount: number; // 담은 수량
    total: number; // 금액
}

type CartActions = {
    increase: (id: string) => void;
    decrease: (id: string) => void;
    removeItem: (id: string) => void; 
    clearCart: () => void;
    calculateTotals: () => void;
}

const useCartStore = create<CartState & CartActions>((set, get) => {
    // 합계를 계산하는 헬퍼 함수
    const calculateTotalsFromItems = (items: CartItem[]) => {
        const amount = items.reduce((sum, item) => sum + item.amount, 0);
        const total = items.reduce(
            (sum, item) => sum + Number(item.price) * item.amount,
            0
        );
        return { amount, total };
    };

    return {
        items: cartItems,
        amount: 0,
        total: 0,

        // 수량 증가
        increase: (id: string) => set((state) => {
            const targetItem = state.items.find((item) => item.id === id);
            if (!targetItem) return state;

            const updatedItems = state.items.map((item) =>
                item.id === id ? { ...item, amount: item.amount + 1 } : item
            );

            const { amount, total } = calculateTotalsFromItems(updatedItems);

            return { items: updatedItems, amount, total };
        }),

        // 수량 감소
        decrease: (id: string) => set((state) => {
            const targetItem = state.items.find((item) => item.id === id);
            if (!targetItem || targetItem.amount <= 0) return state;

            const updatedItems = state.items.map((item) =>
                item.id === id ? { ...item, amount: item.amount - 1 } : item
            );

            const { amount, total } = calculateTotalsFromItems(updatedItems);

            return { items: updatedItems, amount, total };
        }),

        // 특정 아이템의 수량을 0으로 초기화
        removeItem: (id: string) => set((state) => {
            const targetItem = state.items.find((item) => item.id === id);
            if (!targetItem) return state;

            const updatedItems = state.items.map((item) =>
                item.id === id ? { ...item, amount: 0 } : item
            );

            const { amount, total } = calculateTotalsFromItems(updatedItems);

            return { items: updatedItems, amount, total };
        }),

        // 전체 삭제 (수량만 초기화)
        clearCart: () => set((state) => {
            const resetItems = state.items.map((item) => ({
                ...item,
                amount: 0
            }));

            const { amount, total } = calculateTotalsFromItems(resetItems);

            return { items: resetItems, amount, total };
        }),

        // 전체 합계 계산
        calculateTotals: () => set((state) => {
            const { amount, total } = calculateTotalsFromItems(state.items);

            return { ...state, amount, total };
        }),
    };
});

export default useCartStore;