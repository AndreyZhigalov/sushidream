import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModalState } from './models/modalState.interface';

const initialState: ModalState = {
  alertMessage: '',
  confirmMessage: '',
  type: '',
  removeID: null,
  isOpen: false,
  showTerms: false,
  showGetPhoneModal: false,
};

export const modalSlice = createSlice({
  name: 'modalWindow',
  initialState,
  reducers: {
    showGetPhone(state) {
      state.showGetPhoneModal = true;
      state.isOpen = true;
    },
    setAlert(state, action: PayloadAction<string>) {
      state.alertMessage = action.payload;
      state.isOpen = true;
    },
    closeAlert(state) {
      state.alertMessage = '';
      state.confirmMessage = '';
      state.type = '';
      state.removeID = null;
      state.showGetPhoneModal = false;
      state.isOpen = false;
    },
    confirmAlert(
      state,
      action: PayloadAction<{ message: string; type: string; removeID?: number }>,
    ) {
      state.confirmMessage = action.payload.message;
      state.type = action.payload.type;
      state.removeID = action.payload.removeID || null;
      state.isOpen = true;
    },
    toggleTerms(state) {
      state.showTerms = !state.showTerms;
    },
  },
});

