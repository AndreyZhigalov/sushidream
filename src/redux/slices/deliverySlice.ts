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
  },
});

export const { setDeliveryCost } = deliverySlice.actions;
export default deliverySlice.reducer;
