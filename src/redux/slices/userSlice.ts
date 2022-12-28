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
     getuser_data(state) {
      state.birthDay = localStorage.getItem('birthDay') ?? "";
      state.gender = localStorage.getItem('gender') ?? '';
      state.name = localStorage.getItem('name') ?? '';
      state.lastName = localStorage.getItem('lastName') ?? '';
      state.phoneNumber = localStorage.getItem('phoneNumber') ?? '';
      state.email = localStorage.getItem('email') ?? '';
      state.password = localStorage.getItem('password') ?? '';
    },
    setuser_data(state, action: PayloadAction<userSlice[]>) {
      const user_data = action.payload[0];
      state.accessToken = user_data.accessToken;
      state.birthDay = user_data.birthDay;
      state.uid = user_data.uid;
      state.createdAt = user_data.createdAt;
      state.gender = user_data.gender;
      state.name = user_data.name;
      state.lastName = user_data.lastName;
      state.phoneNumber = user_data.phoneNumber;
      state.email = user_data.email;
      state.password = user_data.password;
      state.terms = user_data.terms;
      state.loyalty = user_data.loyalty;
      state.news = user_data.news;

      localStorage.setItem('birthDay', user_data.birthDay);
      localStorage.setItem('gender', user_data.gender);
      localStorage.setItem('name', user_data.name);
      localStorage.setItem('lastName', user_data.lastName);
      localStorage.setItem('phoneNumber', user_data.phoneNumber);
      localStorage.setItem('email', user_data.email);
      localStorage.setItem('password', user_data.password);
    },
    removeuser_data(state) {
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

      localStorage.removeItem('birthDay');
      localStorage.removeItem('gender');
      localStorage.removeItem('name');
      localStorage.removeItem('lastName');
      localStorage.removeItem('phoneNumber');
      localStorage.removeItem('email');
      localStorage.removeItem('password');
    },
  },
});

export const { setuser_data, removeuser_data, getuser_data } = userSlice.actions;
export default userSlice.reducer;
