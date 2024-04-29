import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from './models/userState.interface';
import { UserService } from './user.service';
import { UserInfo } from 'firebase/auth';

const initialState: UserState = {
  uid: '',
  displayName: '',
  phoneNumber: '',
  email: '',
  loyalty: false,
  photoURL: '',
  providerId: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setPhone(state, action: PayloadAction<string>) {
      state.phoneNumber = action.payload;
    },
    setUserData(state, action: PayloadAction<UserInfo>) {
      const userData = action.payload;
      state.uid = userData.uid;
      state.displayName = userData.displayName;
      state.phoneNumber = userData.phoneNumber;
      state.email = userData.email;
      state.photoURL = userData.photoURL;
      state.providerId = userData.providerId;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, setUserData);
    builder.addCase(authUser.fulfilled, setUserData);
    builder.addCase(createUser.fulfilled, setUserData);
    builder.addCase(authUserWithGoogle.fulfilled, setUserData);
    builder.addCase(confirmAuthUserWithPhone.fulfilled, setUserData);
    builder.addCase(signOutUser.fulfilled, clearState);
  },
});

const { createUser, authUser, getUser, signOutUser, confirmAuthUserWithPhone, authUserWithGoogle } =
  new UserService();

const setUserData: CaseReducer<UserState, PayloadAction<UserInfo | null>> = (state, action) => {
  if (!action.payload) return;
  const userData = action.payload;
  state.uid = userData.uid;
  state.displayName = userData.displayName ?? "Гость";
  state.phoneNumber = userData.phoneNumber ?? "Не указан";
  state.email = userData.email ?? 'Не указан';
  state.photoURL = userData.photoURL;
  state.providerId = userData.providerId;
};

const clearState: CaseReducer<UserState> = (state) => {
  state.uid = '';
  state.displayName = '';
  state.phoneNumber = '';
  state.email = '';
  state.loyalty = false;
  state.photoURL = '';
  state.providerId = '';
  localStorage.removeItem('discount');
};
