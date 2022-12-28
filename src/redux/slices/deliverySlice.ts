import { RootState } from './../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DeliveryState {
  regions: string[];
  currentRegion: string;
  costs: number[];
  currentCost: number;
}

const initialState: DeliveryState = {
  regions: ['Самовывоз', 'Близко', 'Средне', 'Далеко'],
  currentRegion: '',
  costs: [0, 200, 400, 600],
  currentCost: 0,
};

export const deliverySlice = createSlice({
  name: 'delivery',
  initialState,
  reducers: {
    fetchRegion(state) {
      state.currentRegion = localStorage.getItem('address') ?? '';
      state.currentCost = Number(localStorage.getItem('delivery-cost'));
    },
    setDeliveryCost(state, action: PayloadAction<number>) {
      state.currentRegion = state.regions[action.payload];
      state.currentCost = state.costs[action.payload];
      localStorage.setItem('delivery-cost', `${state.currentCost}`);
      localStorage.setItem('address', `${state.currentRegion}`);
    },
    clearDelivery(state) {
      state.currentRegion = '';
      state.currentCost = 0;
      localStorage.removeItem('delivery-cost');
      localStorage.removeItem('address');
    },
  },
});

export const selectDelivery = (state: RootState) => state.delivery;

export const { setDeliveryCost, clearDelivery, fetchRegion } = deliverySlice.actions;
export default deliverySlice.reducer;
