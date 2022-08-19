import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface userSlice {
  accessToken: string;
  birthDay: string;
  uid: string;
  createdAt: string;
  gender: string;
  name: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPass: string;
  terms: boolean;
  loyalty: boolean;
  news: boolean;
}

const initialState: userSlice = {
  accessToken: '',
  birthDay: '',
  uid: '',
  createdAt: '',
  gender: '',
  name: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  password: '',
  confirmPass: '',
  terms: false,
  loyalty: false,
  news: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<userSlice[]>) {
      const userData = action.payload[0];
      state.accessToken = userData.accessToken;
      state.birthDay = userData.birthDay;
      state.uid = userData.uid;
      state.createdAt = userData.createdAt;
      state.gender = userData.gender;
      state.name = userData.name;
      state.lastName = userData.lastName;
      state.phoneNumber = userData.phoneNumber;
      state.email = userData.email;
      state.password = userData.password;
      state.terms = userData.terms;
      state.loyalty = userData.loyalty;
      state.news = userData.news;
    },
    removeUserData(state) {
      state.accessToken = '';
      state.birthDay = '';
      state.uid = '';
      state.createdAt = '';
      state.gender = '';
      state.name = '';
      state.lastName = '';
      state.phoneNumber = '';
      state.email = '';
      state.password = '';
      state.terms = false;
      state.loyalty = false;
      state.news = false;
    },
  },
});

export const { setUserData, removeUserData } = userSlice.actions;
export default userSlice.reducer;
