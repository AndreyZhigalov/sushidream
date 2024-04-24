import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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

      localStorage.setItem('uid', userData.uid);
    },
    removeUserData(state) {
      state.uid = '';
      state.displayName = '';
      state.phoneNumber = '';
      state.email = '';
      state.loyalty = false;
      state.photoURL = '';
      state.providerId = '';

      localStorage.removeItem('uid');
      localStorage.removeItem('discount');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action: PayloadAction<UserInfo | null>) => {
      if (!action.payload) return;
      const userData = action.payload;

      state.uid = userData.uid;
      state.displayName = userData.displayName;
      state.phoneNumber = userData.phoneNumber;
      state.email = userData.email;
      state.photoURL = userData.photoURL;
      state.providerId = userData.providerId;
      
    });
    builder.addCase(authUser.fulfilled, (state, action: PayloadAction<UserInfo | null>) => {
      if (!action.payload) return;
      const userData = action.payload;
      state.uid = userData.uid;
      state.displayName = userData.displayName;
      state.phoneNumber = userData.phoneNumber;
      state.email = userData.email;
      state.photoURL = userData.photoURL;
      state.providerId = userData.providerId;

      localStorage.setItem('uid', userData.uid);
    });
    builder.addCase(createUser.fulfilled, (state, action: PayloadAction<UserInfo | null>) => {
      if (!action.payload) return;
      const userData = action.payload;
      state.uid = userData.uid;
      state.displayName = userData.displayName;
      state.phoneNumber = userData.phoneNumber;
      state.email = userData.email;
      state.photoURL = userData.photoURL;
      state.providerId = userData.providerId;

      localStorage.setItem('uid', userData.uid);
    });
  },
});

const { createUser, authUser, getUser } = new UserService();
