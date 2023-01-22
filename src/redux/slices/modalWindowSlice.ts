import { RootState, AppDispatch } from './../store';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

interface ModalSlice {
  alertMessage: string;
  confirmMessage: string;
  type: string;
  removeID: number | null;
  status: string;
  showTerms: boolean
}

enum ModalWindowStatus {
  SHOWN = '',
  HIDDEN = '',
}

const initialState: ModalSlice = {
  alertMessage: '',
  confirmMessage: '',
  type: '',
  removeID: null,
  status: ModalWindowStatus.HIDDEN,
  showTerms: false
};

const modalWindowSlice = createSlice({
  name: 'modalWindow',
  initialState,
  reducers: {
    setAlert(state, action: PayloadAction<string>) {
      state.alertMessage = action.payload;
      state.status = ModalWindowStatus.SHOWN;
    },
    closeAlert(state) {
      state.alertMessage = '';
      state.confirmMessage = '';
      state.type = '';
      state.removeID = null;
      state.status = ModalWindowStatus.HIDDEN;
    },
    confirmAlert(state, action: PayloadAction<{message: string, type: string, removeID?: number}>) {
      state.confirmMessage = action.payload.message;
      state.type = action.payload.type;
      state.removeID = action.payload.removeID || null;      
    },
    toggleTerms(state) {
      state.showTerms = !state.showTerms
    }
  },
});


export const modalSelector = (state: RootState) => state.modals;

export const { setAlert, closeAlert, confirmAlert, toggleTerms } = modalWindowSlice.actions;
export default modalWindowSlice.reducer;
