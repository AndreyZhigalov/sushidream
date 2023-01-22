import { RootState } from './../store';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { setAlert } from './modalWindowSlice';
import { fetchCart } from './cartSlice';

type Assortment = Record<string, AssortmentItem[]>;

export type AssortmentItem = {
  cartID?: string;
  id: number;
  title: string;
  dishPhoto: string;
  portion: number;
  price: number;
  contents: string;
  allergens: string;
  description: string;
  specifics: string[];
  count: number;
  category: string;
  rating: number;
};

type FetchData = [Assortment, string[], string[]];

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface AssortmentState {
  assortment: Assortment;
  banners: string[];
  specials: string[];
  searchedItem?: AssortmentItem | null;
  status: Status;
}

const initialState: AssortmentState = {
  assortment: {},
  banners: [],
  specials: [],
  searchedItem: null,
  status: Status.LOADING,
};

export const assortmentSlice = createSlice({
  name: 'assortment',
  initialState,
  reducers: {
    setAssortment(state, action: PayloadAction<FetchData>) {
      state.assortment = action.payload[0];
      state.banners = action.payload[1];
      state.specials = action.payload[2];
    },
    sortItems(state, action: PayloadAction<string[]>) {
      let sortType = action.payload[0];
      let category = action.payload[1];

      switch (sortType) {
        case 'title':
          state.assortment[category].sort((a, b) => a['title'].localeCompare(b['title']));
          break;
        case 'price+':
          state.assortment[category].sort((a, b) => a['price'] - b['price']);
          break;
        case 'price':
          state.assortment[category].sort((a, b) => b['price'] - a['price']);
          break;
        case 'rating':
          state.assortment[category].sort((a, b) => b['rating'] - a['rating']);
          break;
        case 'cheapest':
          state.assortment[category].sort(
            (a, b) => a['price'] / a['portion'] - b['price'] / b['portion'],
          );
          break;
      }
    },
    findItem(state, action: PayloadAction<number>) {
      for (let key in state.assortment) {
        let item = state.assortment[key].find((item) => item.id === action.payload);
        if (item) {
          state.searchedItem = item;
          break;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAssortment.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchAssortment.fulfilled, (state, action: PayloadAction<FetchData>) => {
      state.status = Status.SUCCESS;
      state.assortment = action.payload[0];
      state.banners = action.payload[1];
      state.specials = action.payload[2];
    });
    builder.addCase(fetchAssortment.rejected, (state, action) => {
      state.status = Status.ERROR;
      console.error(action);
    });
  },
});

export const fetchAssortment = createAsyncThunk<FetchData>(
  'assortment/fetchAssortmentStatus',
  async (_, Thunk) => {
    return await axios
      .get<FetchData>('https://62e206223891dd9ba8def88d.mockapi.io/assortment')
      .then(({ data }) => {
        Thunk.dispatch(fetchCart());
        return data;
      })
      .catch((error) => {
        Thunk.dispatch(setAlert('Ошибка при получении списка товаров'));
        throw new Error(error);
      });
  },
);

export const selectAssortment = (state: RootState) => state.assortmentSlice;

export const { setAssortment, sortItems, findItem } = assortmentSlice.actions;
export default assortmentSlice.reducer;
