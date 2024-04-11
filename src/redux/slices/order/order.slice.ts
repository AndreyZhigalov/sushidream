import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { OrderState } from './models/orderSlice.interface';
import { FetchStatus } from '../../../models';
import { OrderService } from './order.service';

const initialState: OrderState = { orderId: null, status: FetchStatus.WAITING };

export const orderSlice = createSlice({
  name: 'orderSlice',
  initialState,
  reducers: {
    setOrderStatus(state, action: PayloadAction<FetchStatus>) {
      state.status = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getOrder.pending, (state) => {
      state.status = FetchStatus.LOADING;
    });
    builder.addCase(getOrder.fulfilled, (state, action: PayloadAction<string>) => {
      state.status = FetchStatus.SUCCESS;
      state.orderId = action.payload;

      localStorage.removeItem('cart');
      localStorage.removeItem('count');
      localStorage.removeItem('discount');
      localStorage.removeItem('totalPrice');
    });
    builder.addCase(getOrder.rejected, (state, action) => {
      state.status = FetchStatus.ERROR;
    });
  },
});

const getOrder = new OrderService().getOrder