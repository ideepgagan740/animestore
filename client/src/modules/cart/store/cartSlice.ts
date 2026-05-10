import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '@modules/products';
import type { CartItem } from '@modules/cart/types/cart.types';

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existing = state.items.find((item) => item.product.id === action.payload.id);

      if (existing) {
        existing.quantity += 1;
        return;
      }

      state.items.push({ product: action.payload, quantity: 1 });
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.product.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
