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
    setDeliveryCost(state, action: PayloadAction<number>) {
      state.currentRegion = state.regions[action.payload];
      state.currentCost = state.costs[action.payload];
    },
    clearDelivery(state) {
      state.currentRegion = '';
      state.currentCost = 0;
    },
  },
});

export const selectDelivery = (state: RootState) => state.delivery;

export const { setDeliveryCost, clearDelivery } = deliverySlice.actions;
export default deliverySlice.reducer;
