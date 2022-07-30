import { AssortmentItem } from './assortmentSlice';
import { RootState } from './../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  cartItems: AssortmentItem[];
  count: number;
  totalPrice: number;
}

const initialState: CartState = {
  cartItems: [],
  count: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<AssortmentItem>) {
      let item = action.payload;
      let findItem = state.cartItems.find((obj) => obj.id === item.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.cartItems.push(item);
      }
      state.totalPrice = state.cartItems.reduce((sum, obj) => sum + obj.price * obj.count, 0);
      state.count += 1;
    },
    removeFromCart(state, action: PayloadAction<AssortmentItem>) {
      let item = action.payload;
      let findItem = state.cartItems.find((obj) => obj.id === item.id);
      if (item.count === 1) {
        if (window.confirm(`Удалить ${item.title} из корзины?`)) {
          state.cartItems = state.cartItems.filter((obj) => obj.id !== item.id);
        }
      } else {
        if (findItem) findItem.count--;
      }

      state.totalPrice = state.cartItems.reduce((sum, obj) => sum + obj.price * obj.count, 0);
      state.count -= 1;
    },
    clearCart(state) {
      if (window.confirm('Отчистить корзину?')) {
        state.cartItems = [];
        state.count = 0;
        state.totalPrice = 0;
      }
    },
  },
});

export const cartSelector = (state: RootState) => state.cart;

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
