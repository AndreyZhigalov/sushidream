import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FiltersState } from './models/filtersState.interface';
import { SortItem } from '../../../models';
import { CATEGORIES, SORT_TYPES, SUBCATEGORIES } from './constants';

const initialState: FiltersState = {
  categories: CATEGORIES,
  subcategories: SUBCATEGORIES,
  sortTypes: SORT_TYPES,
  currentSubcategory: SUBCATEGORIES[0],
  currentSortType: SORT_TYPES[0],
  currentCategory: CATEGORIES[0],
  searchedItemId: 0,
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSubcategory(state, action: PayloadAction<SortItem>) {
      state.currentSubcategory = action.payload;
    },
    setCategory(state, action: PayloadAction<SortItem>) {
      state.currentCategory = action.payload;
    },
    setSort(state, action: PayloadAction<SortItem>) {
      state.currentSortType = action.payload;
    },
    setSearchedItemId(state, action: PayloadAction<number>) {
      state.searchedItemId = action.payload;
    },
  },
});
