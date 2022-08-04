import { RootState } from './../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SortState = {
  ruTitle: string;
  engTitle: string;
}[];

export type CurrentSortState = {
  ruTitle: string;
  engTitle: string;
};

interface filtersState {
  categories: SortState;
  sortTypes: SortState;
  currentSortType: CurrentSortState;
  currentCategory: CurrentSortState;
  searchedItemId: number;
}

const initialState: filtersState = {
  categories: [
    {
      ruTitle: 'Новинки',
      engTitle: 'new',
    },
    {
      ruTitle: 'Ланч',
      engTitle: 'lunch',
    },
    {
      ruTitle: 'Сет на одного',
      engTitle: 'one-person-box',
    },
    {
      ruTitle: 'Сет на компанию',
      engTitle: 'company-box',
    },
    {
      ruTitle: 'Жаренные роллы',
      engTitle: 'fried-roll',
    },
    {
      ruTitle: 'Калифорния',
      engTitle: 'california',
    },
    {
      ruTitle: 'Фреш роллы',
      engTitle: 'fresh-roll',
    },
    {
      ruTitle: 'Маки',
      engTitle: 'maki',
    },
    {
      ruTitle: 'Суши',
      engTitle: 'sushi',
    },
    {
      ruTitle: 'Чаши',
      engTitle: 'bowels',
    },
    {
      ruTitle: 'Чираши и Сашими',
      engTitle: 'chirashi-sashimi',
    },
    {
      ruTitle: 'Тартар и Севич',
      engTitle: 'tartar-sevich',
    },
    {
      ruTitle: 'ДЕТСКОЕ МЕНЮ',
      engTitle: 'kids-menu',
    },
    {
      ruTitle: 'Аккомпанемент',
      engTitle: 'accompaniment',
    },
    {
      ruTitle: 'Десерты',
      engTitle: 'dessert',
    },
    {
      ruTitle: 'Напитки',
      engTitle: 'drinkables',
    },
    {
      ruTitle: 'Дополнительно',
      engTitle: 'additionals',
    },
    {
      ruTitle: 'Соусы',
      engTitle: 'souces',
    },
  ],
  sortTypes: [
    {
      ruTitle: 'названию',
      engTitle: 'title',
    },
    {
      ruTitle: 'цене по возрастанию',
      engTitle: 'price+',
    },
    {
      ruTitle: 'цене по убыванию',
      engTitle: 'price',
    },
    {
      ruTitle: 'популярности',
      engTitle: 'rating',
    },
    {
      ruTitle: 'цене за штуку',
      engTitle: 'cheapest',
    },
  ],
  currentSortType: {
    ruTitle: 'названию',
    engTitle: 'title',
  },
  currentCategory: {
    ruTitle: 'Новинки',
    engTitle: 'new',
  },
  searchedItemId: 0,
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<CurrentSortState>) {
      state.currentCategory = action.payload;
    },
    setSort(state, action: PayloadAction<CurrentSortState>) {
      state.currentSortType = action.payload;
    },
    setSearchedItemId(state, action: PayloadAction<number>) {
      state.searchedItemId = action.payload;
    },
  },
});

export const selectFilters = (state: RootState) => state.filters;

export const { setCategory, setSort, setSearchedItemId } = filtersSlice.actions;
export default filtersSlice.reducer;
