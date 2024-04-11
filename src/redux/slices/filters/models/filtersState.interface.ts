import { SortItem } from "../../../../models";

export interface FiltersState {
  categories: SortItem[];
  subcategories: SortItem[];
  sortTypes: SortItem[];
  currentSubcategory: SortItem;
  currentSortType: SortItem;
  currentCategory: SortItem;
  searchedItemId: number;
}
