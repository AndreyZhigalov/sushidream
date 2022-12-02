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

export const fetchCart = createAsyncThunk<AssortmentItem[]>('cart/fetchCartStatus', async () => {
  const { data } = await axios.get<AssortmentItem[]>(
    `https://62e206223891dd9ba8def88d.mockapi.io/cart`,
  );
  return data;
});

export const addToCart = createAsyncThunk<AssortmentItem, AssortmentItem>(
  'cart/addToCartStatus',
  async (item, thunkAPI) => {
    const {
      cart: { cartItems, orderStatus },
    } = thunkAPI.getState() as RootState;
    if (orderStatus === OrderStatus.SUCCESS) {
      thunkAPI.dispatch(clearOrderStatus());
    }
    let findItem = cartItems.find((obj) => obj.id === item.id);
    if (findItem && findItem.count === 1) {
      const { data } = await axios.post<AssortmentItem>(
        `https://62e206223891dd9ba8def88d.mockapi.io/cart`,
        item,
      );
      return data as AssortmentItem;
    }
    if (findItem && findItem.count > 1) {
      return findItem;
    }

    return findItem as AssortmentItem;
  },
);

export const removeFromCart = createAsyncThunk<AssortmentItem, AssortmentItem>(
  'cart/removecartItemStatus',
  async (item, thunkAPI) => {
    const {
      cart: { cartItems },
    } = thunkAPI.getState() as RootState;
    let findItem = cartItems.find((obj) => obj.id === item.id);
    if (findItem) {
      if (item.count === 1) {
        if (window.confirm(`Удалить ${item.title} из корзины?`)) {
          await axios.delete(`https://62e206223891dd9ba8def88d.mockapi.io/cart/${findItem.cartID}`);
          return item;
        }
      }
    }
    return item;
  },
);

const deleteAllItem = (i: number, id: string) => {
  setTimeout(() => {
    axios.delete(`https://62e206223891dd9ba8def88d.mockapi.io/cart/${id}`);
  }, (i + 1) * 200);
};

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
    clearCart(state) {
      if (window.confirm('Отчистить корзину?')) {
        for (let i = 0; i <= state.cartItems.length - 1; i++) {
          let id = state.cartItems[i].cartID;
          if (id) deleteAllItem(i, id);
        }
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
    builder.addCase(fetchCart.pending, (state) => {
      state.cartStatus = CartStatus.LOADING;
    });
    builder.addCase(fetchCart.fulfilled, (state, action: PayloadAction<AssortmentItem[]>) => {
      state.cartStatus = CartStatus.SUCCESS;
      state.cartItems = action.payload;
      state.totalPrice = state.cartItems.reduce((sum, obj) => sum + obj.price * obj.count, 0);
      state.count = state.cartItems.reduce((sum, obj) => sum + obj.count, 0);
    });
    builder.addCase(fetchCart.rejected, (state) => {
      state.cartStatus = CartStatus.ERROR;
      alert('Не удалось загрузить вашу корзину');
    });
    builder.addCase(addToCart.pending, (state, action: { meta: { arg: AssortmentItem } }) => {
      let item = action.meta.arg;
      let findItem = state.cartItems.find((obj) => obj.id === item.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.cartItems.push(item);
      }
    });
    builder.addCase(addToCart.fulfilled, (state, action: PayloadAction<AssortmentItem>) => {
      let item = action.payload;
      state.cartItems = state.cartItems.map((obj) => {
        return obj.id === item.id ? item : obj;
      });
      state.totalPrice = state.cartItems.reduce((sum, obj) => sum + obj.price * obj.count, 0);
      state.count += 1;
    });
    builder.addCase(addToCart.rejected, () => {
      alert('При добавлении товара в корзину произошла ошибка.');
    });
    builder.addCase(removeFromCart.fulfilled, (state, action: PayloadAction<AssortmentItem>) => {
      let item = action.payload;
      let findItem = state.cartItems.find((obj) => obj.id === item.id);
      if (item.count === 1) {
        state.cartItems = state.cartItems.filter((obj) => obj.id !== item.id);
      } else {
        if (findItem) findItem.count--;
      }
      state.totalPrice = state.cartItems.reduce((sum, obj) => sum + obj.price * obj.count, 0);
      state.count -= 1;
    });
    builder.addCase(removeFromCart.rejected, () => {
      alert('Произошла ошибка при удалении товара из корзины');
    });
    builder.addCase(getOrder.pending, (state) => {
      state.orderStatus = OrderStatus.SENDING;
    });
    builder.addCase(getOrder.fulfilled, (state, action: PayloadAction<string>) => {
      state.orderStatus = OrderStatus.SUCCESS;
      state.orderId = action.payload;
      for (let i = 0; i <= state.cartItems.length - 1; i++) {
        let id = state.cartItems[i].cartID;
        if (id) deleteAllItem(i, id);
      }
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

export const { clearCart, clearOrderStatus } = cartSlice.actions;
export default cartSlice.reducer;
