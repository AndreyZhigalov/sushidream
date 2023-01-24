import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthUserData } from '../../componenst';

export interface userSlice {
  birthDay: string;
  uid: string;
  gender: string;
  name: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  loyalty: boolean;
}

const initialState: userSlice = {
  birthDay: '',
  uid: '',
  gender: '',
  name: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  loyalty: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setPhone(state, action:PayloadAction<string>) {
      state.phoneNumber = action.payload
    },
    getuser_data(state) {
      state.uid = localStorage.getItem('uid') ?? '';
      state.loyalty = JSON.parse(localStorage.getItem('loyalty') ?? "false");
      state.birthDay = localStorage.getItem('birthDay') ?? '';
      state.gender = localStorage.getItem('gender') ?? '';
      state.name = localStorage.getItem('name') ?? '';
      state.lastName = localStorage.getItem('lastName') ?? '';
      state.phoneNumber = localStorage.getItem('phoneNumber') ?? '';
      state.email = localStorage.getItem('email') ?? '';
    },
    setuser_data(state, action: PayloadAction<AuthUserData>) {
      const user_data = action.payload;
      state.birthDay = user_data.birthDay;
      state.uid = user_data.uid;
      state.gender = user_data.gender;
      state.name = user_data.name;
      state.lastName = user_data.lastName;
      state.phoneNumber = user_data.phoneNumber;
      state.email = user_data.email;
      state.loyalty = user_data.loyalty;

      localStorage.setItem('uid', user_data.uid);
      localStorage.setItem('loyalty', JSON.stringify(user_data.loyalty));
      localStorage.setItem('birthDay', user_data.birthDay);
      localStorage.setItem('gender', user_data.gender);
      localStorage.setItem('name', user_data.name);
      localStorage.setItem('lastName', user_data.lastName);
      localStorage.setItem('phoneNumber', user_data.phoneNumber);
      localStorage.setItem('email', user_data.email);
    },
    removeuser_data(state) {
      state.birthDay = '';
      state.uid = '';
      state.gender = '';
      state.name = '';
      state.lastName = '';
      state.phoneNumber = '';
      state.email = '';
      state.loyalty = false;

      localStorage.removeItem('uid');
      localStorage.removeItem('loyalty');
      localStorage.removeItem('birthDay');
      localStorage.removeItem('gender');
      localStorage.removeItem('name');
      localStorage.removeItem('lastName');
      localStorage.removeItem('phoneNumber');
      localStorage.removeItem('email');
      localStorage.removeItem('discount');
    },
  },
});

export const { setuser_data, removeuser_data, getuser_data, setPhone } = userSlice.actions;
export default userSlice.reducer;
