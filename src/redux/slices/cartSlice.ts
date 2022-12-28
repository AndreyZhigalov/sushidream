import { AssortmentItem } from './assortmentSlice';
import { RootState } from './../store';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export enum CartStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface CartState {
  cartItems: AssortmentItem[];
  count: number;
  totalPrice: number;
  cartStatus: CartStatus;
  orderId: string | null;
  orderStatus: string;
}

type OrderItem = {
  createdAt: string;
  items: AssortmentItem[];
  orderID: string;
};

export enum OrderStatus {
  SENDING = 'sending',
  SUCCESS = 'success',
  ERROR = 'error',
}

// export const fetchCart = createAsyncThunk<AssortmentItem[]>('cart/fetchCartStatus', async () => {
//   const { data } = await axios.get<AssortmentItem[]>(
//     `https://62e206223891dd9ba8def88d.mockapi.io/cart`,
//   );
//   return data;
// });

// export const addToCart = createAsyncThunk<AssortmentItem, AssortmentItem>(
//   'cart/addToCartStatus',
//   async (item, thunkAPI) => {
//     const {
//       cart: { cartItems, orderStatus },
//     } = thunkAPI.getState() as RootState;
//     if (orderStatus === OrderStatus.SUCCESS) {
//       thunkAPI.dispatch(clearOrderStatus());
//     }
//     let findItem = cartItems.find((obj) => obj.id === item.id);
//     if (findItem && findItem.count === 1) {
//       const { data } = await axios.post<AssortmentItem>(
//         `https://62e206223891dd9ba8def88d.mockapi.io/cart`,
//         item,
//       );
//       return data as AssortmentItem;
//     }
//     if (findItem && findItem.count > 1) {
//       return findItem;
//     }

//     return findItem as AssortmentItem;
//   },
// );

// export const removeFromCart = createAsyncThunk<AssortmentItem, AssortmentItem>(
//   'cart/removecartItemStatus',
//   async (item, thunkAPI) => {
//     const {
//       cart: { cartItems },
//     } = thunkAPI.getState() as RootState;
//     let findItem = cartItems.find((obj) => obj.id === item.id);
//     if (findItem) {
//       if (item.count === 1) {
//         if (window.confirm(`Удалить ${item.title} из корзины?`)) {
//           await axios.delete(`https://62e206223891dd9ba8def88d.mockapi.io/cart/${findItem.cartID}`);
//           return item;
//         }
//       }
//     }
//     return item;
//   },
// );

// const deleteAllItem = (i: number, id: string) => {
//   setTimeout(() => {
//     axios.delete(`https://62e206223891dd9ba8def88d.mockapi.io/cart/${id}`);
//   }, (i + 1) * 200);
// };

export const getOrder = createAsyncThunk('cart/getOrderStatus', async (_, thunkAPI) => {
  const {
    cart: { cartItems, totalPrice },
    delivery: { currentRegion, currentCost },
  } = thunkAPI.getState() as RootState;

  const {
    data: { orderID },
  } = await axios.post<OrderItem>(`https://62e206223891dd9ba8def88d.mockapi.io/orders`, {
    items: cartItems,
    adress: currentRegion,
    deliveryCost: currentCost,
    TotalCost: totalPrice,
  });

  return orderID;
});

const initialState: CartState = {
  cartItems: [],
  count: 0,
  totalPrice: 0,
  cartStatus: CartStatus.LOADING,
  orderId: null,
  orderStatus: '',
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    fetchCart(state) {
      state.cartItems = JSON.parse(localStorage.getItem('cart') ?? '[]');
      state.count = Number(localStorage.getItem('count')) ?? 0;
      state.totalPrice = Number(localStorage.getItem('totalPrice'));
    },
    addToCart(state, action: PayloadAction<AssortmentItem>) {
      let cart: AssortmentItem[] = JSON.parse(localStorage.getItem('cart') ?? '[]');
      let findItem = state.cartItems.find((obj) => obj.id === action.payload.id);

      if (state.orderStatus === OrderStatus.SUCCESS) {
        state.orderStatus = '';
      }

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

      let findItem = state.cartItems.find((obj) => obj.id === action.payload);

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
        if (window.confirm(`Удалить ${findItem.title} из корзины?`)) {
          state.count = --state.count;
          localStorage.setItem('count', `${state.count}`);

          cart = cart.filter((item) => item.id !== action.payload);
          state.cartItems = cart;
          localStorage.setItem('cart', JSON.stringify(cart));
        }
      }
      state.totalPrice = state.cartItems.reduce((sum, item) => sum + item.price * item.count, 0);
      localStorage.setItem('totalPrice', `${state.totalPrice}`);
    },
    clearCart(state) {
      if (window.confirm('Отчистить корзину?')) {
        localStorage.removeItem('cart');
        localStorage.removeItem('count');
        localStorage.removeItem('totalPrice');
        state.cartItems = [];
        state.count = 0;
        state.totalPrice = 0;
      }
    },
    clearOrderStatus(state) {
      state.orderStatus = '';
    },
  },
  extraReducers(builder) {
    // GETTIN ORDER

    builder.addCase(getOrder.pending, (state) => {
      state.orderStatus = OrderStatus.SENDING;
    });
    builder.addCase(getOrder.fulfilled, (state, action: PayloadAction<string>) => {
      state.orderStatus = OrderStatus.SUCCESS;
      state.orderId = action.payload;

      localStorage.removeItem('cart');
      localStorage.removeItem('count');
      localStorage.removeItem('totalPrice');
      state.cartItems = [];
      state.count = 0;
      state.totalPrice = 0;
    });
    builder.addCase(getOrder.rejected, (state, action) => {
      state.orderStatus = OrderStatus.ERROR;
      alert('Ошибка при отправке заказа на сервер');
    });
  },
});

export const selectCart = (state: RootState) => state.cart;

export const { clearOrderStatus, fetchCart, addToCart, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
