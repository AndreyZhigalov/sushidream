import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NavbarState } from './models/navbarState.interface';

const initialState: NavbarState = {
  isOpened: false,
};

export const navbarSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    openNavbar(state, action: PayloadAction<boolean>) {
      state.isOpened = action.payload;
    },
  },
});


