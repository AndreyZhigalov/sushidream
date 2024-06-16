import qs from 'qs';
import { SortItem, FetchStatus } from '../models';
import { useAssortmentActions, useAssortmentGetters } from '../redux/slices/assortment';
import { useFiltersActions, useFiltersGetters } from '../redux/slices/filters';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

/**
 * Запрос всех данных для главной страницы: баннеры, список позиций, иконки
 * @param query Строка с параметрами поиска
 * */

export const useFilterParams = (query: string) => {
  const { pathname } = useLocation();
  const { get, getBanners, getSpecificsIcons } = useAssortmentActions();
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
    if (status === FetchStatus.LOADING) {
      get(currentCategory.value);
      getSpecificsIcons();
    }
    if (pathname === `${ROUTES.base}${ROUTES.main}`) getBanners();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
