import { createSlice, PayloadAction } from '@reduxjs/toolkit';


import { DeliveryState } from './models/deliveryState.interface';
import { DeliveryService } from './delivery.service';

const initialState: DeliveryState = {
  regions: ['Самовывоз'],
  currentRegion: '',
  costs: [0, 100, 300, 400, 600, 800],
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
  }, extraReducers: (builder) => {
    builder.addCase(getAddresses.fulfilled, (state, action) => {
      const regions = Object.values(action.payload ?? {}).map(item => `${item.city}, ${item.street}`)
      state.regions = ['Самовывоз', ...regions]
    })
  }
});

const { getAddresses } = new DeliveryService()