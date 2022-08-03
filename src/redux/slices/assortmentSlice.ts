import { RootState } from './../store';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAssortment = createAsyncThunk<FetchData>(
  'assortment/fetchAssortmentStatus',
  async () => {
    const { data } = await axios.get<FetchData>(
      'https://62e206223891dd9ba8def88d.mockapi.io/assortment',
    );
    return data;
  },
);

type Assortment = Record<string, AssortmentItem[]>;

export type AssortmentItem = {
  id: string;
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
  status: Status;
}

const initialState: AssortmentState = {
  assortment: {},
  banners: [],
  specials: [],
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
      if (sortType === 'title') {
        state.assortment[category].sort((a, b) => a['title'].localeCompare(b['title']));
      } else if (sortType === 'price+') {
        state.assortment[category].sort((a, b) => a['price'] - b['price']);
      } else if (sortType === 'price') {
        state.assortment[category].sort((a, b) => b['price'] - a['price']);
      } else if (sortType === 'rating') {
        state.assortment[category].sort((a, b) => b['rating'] - a['rating']);
      } else if (sortType === 'cheapest') {
        state.assortment[category].sort(
          (a, b) => a['price'] / a['portion'] - b['price'] / b['portion'],
        );
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
      alert('Ошибка при получении списка товаров');
    });
  },
});

export const selectAssortment = (state: RootState) => state.assortment;

export const { setAssortment, sortItems } = assortmentSlice.actions;
export default assortmentSlice.reducer;
