import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AssortmentState } from './models/assortmentState.interface';
import { Banners, FetchStatus } from '../../../models';
import { FetchData } from './models/assortmentFetchData.interface';
import { AssortmentService } from './assortment.service';
import { AssortmentItem } from './models/assortmentItem.interface';

const initialState: AssortmentState = {
  items: [],
  banners: {},
  specials: [],
  searchedItem: null,
  status: FetchStatus.LOADING,
};

export const assortmentSlice = createSlice({
  name: 'assortment',
  initialState,
  reducers: {
    setAssortment(state, action: PayloadAction<FetchData>) {
      state.items = action.payload[0];
      state.banners = action.payload[1];
      state.specials = action.payload[2];
    },
    sortItems(state, action: PayloadAction<string>) {
      const sortType = action.payload;

      switch (sortType) {
        case 'title':
          state.items.sort((a, b) => a['title'].localeCompare(b['title']));
          break;
        case 'price+':
          state.items.sort((a, b) => a['price'] - b['price']);
          break;
        case 'price':
          state.items.sort((a, b) => b['price'] - a['price']);
          break;
        case 'rating':
          state.items.sort((a, b) => b['rating'] - a['rating']);
          break;
        case 'cheapest':
          state.items.sort((a, b) => a['price'] / a['portion'] - b['price'] / b['portion']);
          break;
      }
    },
    findItem(state, action: PayloadAction<number>) {
      state.searchedItem = state.items.find((item) => item.id === action.payload) || null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBanners.pending, handlePending);
    builder.addCase(getSpecificsIcons.pending, handlePending);
    builder.addCase(get.pending, handlePending);
    builder.addCase(getBanners.fulfilled, (state, action: PayloadAction<Banners>) => {
      state.banners = action.payload;
    });
    builder.addCase(getSpecificsIcons.fulfilled, (state, action: PayloadAction<string[]>) => {
      state.specials = action.payload;
    });
    builder.addCase(get.fulfilled, (state, action: PayloadAction<AssortmentItem[]>) => {
      state.status = FetchStatus.SUCCESS;
      state.items = action.payload;
    });
    builder.addCase(getBanners.rejected, handleError);
    builder.addCase(getSpecificsIcons.rejected, handleError);
    builder.addCase(get.rejected, handleError);
  },
});

const { getBanners, get, getSpecificsIcons } = new AssortmentService();

const handleError: CaseReducer = (state, action) => {
  state.status = FetchStatus.ERROR;
  console.error(action);
};
const handlePending: CaseReducer = (state) => {
  state.status = FetchStatus.LOADING;
};
