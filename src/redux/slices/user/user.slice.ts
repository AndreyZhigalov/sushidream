import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from './models/userState.interface';
import { AuthUserData } from '../../../models';
import { UserService } from './user.service';
import { UserData } from './models/user.interface';

const initialState: UserState = {
  birthDay: '',
  uid: '',
  gender: '',
  name: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  loyalty: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setPhone(state, action: PayloadAction<string>) {
      state.phoneNumber = action.payload;
    },
    setUserData(state, action: PayloadAction<AuthUserData>) {
      const userData = action.payload;
      state.birthDay = userData.birthDay;
      state.uid = userData.uid;
      state.gender = userData.gender;
      state.name = userData.name;
      state.lastName = userData.lastName;
      state.phoneNumber = userData.phoneNumber;
      state.email = userData.email;
      state.loyalty = userData.loyalty;

      localStorage.setItem('uid', userData.uid);
    },
    removeUserData(state) {
      state.birthDay = '';
      state.uid = '';
      state.gender = '';
      state.name = '';
      state.lastName = '';
      state.phoneNumber = '';
      state.email = '';
      state.loyalty = false;

      localStorage.removeItem('uid');
      localStorage.removeItem('discount');
    },
  }, extraReducers: (builder) => {
    builder.addCase(fetchUserData.fulfilled, (state, action: PayloadAction<UserData | undefined>) => {
      if (!action.payload) return
      const userData = action.payload;
      state.birthDay = userData.birthDay;
      state.uid = userData.uid;
      state.gender = userData.gender;
      state.name = userData.name;
      state.lastName = userData.lastName;
      state.phoneNumber = userData.phoneNumber;
      state.email = userData.email;
      state.loyalty = userData.loyalty;
    })
  }
});

const { fetchUserData } = new UserService()