import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AssortmentItem } from '../assortment';
import { CartState } from './models/cartState.interface';
import { FetchStatus } from '../../../models';

const initialState: CartState = {
  cartItems: [],
  count: 0,
  discount: 0,
  totalPrice: 0,
  cartStatus: FetchStatus.LOADING,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    fetchCart(state) {
      state.cartItems = JSON.parse(localStorage.getItem('cart') ?? '[]');
      state.count = Number(localStorage.getItem('count')) ?? 0;
      state.totalPrice = Number(localStorage.getItem('totalPrice'));
      state.discount = Number(localStorage.getItem('discount')) ?? 0;
    },
    addToCart(state, action: PayloadAction<AssortmentItem>) {
      const cart: AssortmentItem[] = JSON.parse(localStorage.getItem('cart') ?? '[]');
      const findItem = state.cartItems.find((obj) => obj.id === action.payload.id);

      if (!findItem) {
        state.cartItems = [...state.cartItems, action.payload];
        localStorage.setItem('cart', JSON.stringify([...cart, action.payload]));

        state.count = ++state.count;
        localStorage.setItem('count', `${state.count}`);
      }

      if (findItem && findItem.count >= 1) {
        state.count = ++state.count;
        localStorage.setItem('count', `${state.count}`);

        state.cartItems = state.cartItems.map((item) =>
          item.id === action.payload.id ? { ...item, count: item.count + 1 } : item,
        );
        localStorage.setItem(
          'cart',
          JSON.stringify(
            cart.map((item) =>
              item.id === action.payload.id ? { ...item, count: item.count + 1 } : item,
            ),
          ),
        );
      }

      state.totalPrice = state.cartItems.reduce((sum, item) => sum + item.price * item.count, 0);
      localStorage.setItem('totalPrice', `${state.totalPrice}`);
    },
    removeFromCart(state, action: PayloadAction<number>) {
      let cart: AssortmentItem[] = JSON.parse(localStorage.getItem('cart') ?? '[]');

      const findItem = state.cartItems.find((obj) => obj.id === action.payload);

      if (findItem && findItem.count > 1) {
        state.count = --state.count;
        localStorage.setItem('count', `${state.count}`);

        state.cartItems = state.cartItems.map((item) =>
          item.id === action.payload ? { ...item, count: item.count - 1 } : item,
        );
        localStorage.setItem(
          'cart',
          JSON.stringify(
            cart.map((item) =>
              item.id === action.payload ? { ...item, count: item.count - 1 } : item,
            ),
          ),
        );
      }

      if (findItem && findItem.count === 1) {
        state.count = --state.count;
        localStorage.setItem('count', `${state.count}`);

        cart = cart.filter((item) => item.id !== action.payload);
        state.cartItems = cart;
        localStorage.setItem('cart', JSON.stringify(cart));
      }
      state.totalPrice = state.cartItems.reduce((sum, item) => sum + item.price * item.count, 0);
      localStorage.setItem('totalPrice', `${state.totalPrice}`);
    },
    clearCart(state) {
      localStorage.removeItem('cart');
      localStorage.removeItem('count');
      localStorage.removeItem('discount');
      localStorage.removeItem('totalPrice');
      state.cartItems = [];
      state.count = 0;
      state.totalPrice = 0;
    },

    setDiscount(state) {
      state.discount = 10;
      localStorage.setItem('discount', '10');
    },
  },
});
