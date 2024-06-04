import qs from 'qs';
import { SortItem, FetchStatus } from '../models';
import { useAssortmentActions, useAssortmentGetters } from '../redux/slices/assortment';
import { useFiltersActions, useFiltersGetters } from '../redux/slices/filters';
import { useEffect } from 'react';

export const useFilterParams = (query: string) => {
  const { getAll } = useAssortmentActions();
  const { status } = useAssortmentGetters();
  const { setCategory, setSubcategory, setSort, setSearchedItemId } = useFiltersActions();
  const { currentCategory, categories, sortTypes, subcategories } = useFiltersGetters();
  useEffect(() => {
    if (query) {
      const searchParameters = qs.parse(query.substring(1).replace('(asc)', '%2B'));
      const category = categories.find((obj: SortItem) => obj.value === searchParameters.category);
      const subcategory = subcategories.find(
        (obj: SortItem) => obj.value === searchParameters.subcategory,
      );
      const sort = sortTypes.find((obj: SortItem) => obj.value === searchParameters.sortBy);
      const item = searchParameters.item;
      if (category) setCategory(category);
      if (subcategory) setSubcategory(subcategory);
      if (sort) setSort(sort);
      if (item) setSearchedItemId(+item as number);
    } else {
      setSort(sortTypes[3]);
      setCategory(categories[0]);
    }
    if (status === FetchStatus.LOADING) getAll(currentCategory.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);
};
