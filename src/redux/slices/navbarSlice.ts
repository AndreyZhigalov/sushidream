import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NavbarState {
  isOpened: boolean;
}

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

export const { openNavbar } = navbarSlice.actions;
export default navbarSlice.reducer;
