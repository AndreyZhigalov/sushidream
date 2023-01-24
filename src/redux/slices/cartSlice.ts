import { firestoreDB } from './../../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { AssortmentItem } from './assortmentSlice';
import { RootState } from './../store';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { setAlert } from './modalWindowSlice';

export enum CartStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface CartState {
  cartItems: AssortmentItem[];
  count: number;
  discount: number;
  totalPrice: number;
  cartStatus: CartStatus;
  orderId: string | null;
  orderStatus: string;
}

type OrderItem = {
  orderID: string;
  items: AssortmentItem[];
  address: string;
  deliveryCost: number;
  discount: number;
  TotalCost: number;
};

export enum OrderStatus {
  SENDING = 'sending',
  SUCCESS = 'success',
  ERROR = 'error',
}

const initialState: CartState = {
  cartItems: [],
  count: 0,
  discount: 0,
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
      state.discount = Number(localStorage.getItem('discount')) ?? 0;
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
    clearOrderStatus(state) {
      state.orderStatus = '';
    },
    setDiscount(state) {
      state.discount = 30;
      localStorage.setItem('discount', `30`);
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
      localStorage.removeItem('discount');
      localStorage.removeItem('totalPrice');
      state.cartItems = [];
      state.count = 0;
      state.totalPrice = 0;
    });
    builder.addCase(getOrder.rejected, (state, action) => {
      state.orderStatus = OrderStatus.ERROR;
    });
  },
});

export const getOrder = createAsyncThunk('cart/getOrderStatus', async (_, Thunk) => {
  const {
    cart: { cartItems, totalPrice, discount },
    delivery: { currentRegion, currentCost },
    user: { uid, phoneNumber },
  } = Thunk.getState() as RootState;

  const userID = uid
    ? uid
    : `anon_user_${Math.floor(Math.random() * 10e16)
        .toString(16)
        .toLocaleUpperCase()}`;

  const orderID = Math.floor(Math.random() * 10e16)
    .toString(16)
    .toLocaleUpperCase();

  const orderslist =
    (await getDoc(doc(firestoreDB, 'orders', userID)).then(
      (res) => res.data() as { orderslist: OrderItem[] },
    )) ?? ({} as { orderslist: OrderItem[] });

  const finalDiscount = (10e10 * ((totalPrice + currentCost) / 100) * 30) / 10e10;
  const newOrder = {
    orderID,
    items: cartItems,
    address: currentRegion,
    deliveryCost: currentCost,
    discount,
    TotalCost:
      discount > 0 && totalPrice > 0
        ? totalPrice + currentCost - finalDiscount
        : totalPrice + currentCost,
  };

  return await setDoc(
    doc(firestoreDB, 'orders', userID),
    orderslist.orderslist
      ? { orderslist: [...orderslist.orderslist, newOrder], phone: phoneNumber }
      : { orderslist: [newOrder], phone: phoneNumber },
  )
    .then(() => {
      return orderID;
    })
    .catch((error) => {
      Thunk.dispatch(setAlert('Ошибка при отправке заказа. Попробуйте ещё раз'));
      throw new Error(error);
    });
});

export const selectCart = (state: RootState) => state.cart;

export const { clearOrderStatus, fetchCart, addToCart, removeFromCart, clearCart, setDiscount } =
  cartSlice.actions;
export default cartSlice.reducer;
