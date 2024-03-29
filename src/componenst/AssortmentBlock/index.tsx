import React from 'react';
import qs from 'qs';
import { useNavigate, useLocation } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../../Hooks/hooks';
import {
  sortItems,
  fetchAssortment,
  selectAssortment,
  AssortmentItem,
  findItem,
  Status,
} from '../../redux/slices/assortmentSlice';
import {
  CurrentSortState,
  selectFilters,
  setCategory,
  setSearchedItemId,
  setSort,
  setSubcategory,
} from '../../redux/slices/filtersSlice';
import { AssortmentCard } from './AssortmentCard';
import { LoadingCard } from '../LoadingCard';
import { FetchError } from './FetchError';

import styles from './AssortmentBlock.module.scss';

export const AccortmentBlock: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();
  const {
    currentSortType,
    currentCategory,
    categories,
    sortTypes,
    searchedItemId,
    currentSubcategory,
    subcategories,
  } = useAppSelector(selectFilters);
  const { assortment, status } = useAppSelector(selectAssortment);

  React.useEffect(() => {
    if (status === Status.SUCCESS && searchedItemId) {
      dispatch(findItem(searchedItemId));
    }
  }, [status]);

  React.useEffect(() => {
    if (search) {
      let searchParameters = qs.parse(search.substring(1).replace('(asc)', '%2B'));
      let category = categories.find(
        (obj: CurrentSortState) => obj.engTitle === searchParameters.category,
      );
      let subcategory = subcategories.find(
        (obj: CurrentSortState) => obj.engTitle === searchParameters.subcategory,
      );
      let sort = sortTypes.find(
        (obj: CurrentSortState) => obj.engTitle === searchParameters.sortBy,
      );
      let item = searchParameters.item;
      if (category) dispatch(setCategory(category));
      if (subcategory) dispatch(setSubcategory(subcategory));
      if (sort) dispatch(setSort(sort));
      if (item) dispatch(setSearchedItemId(+item as number));
    } else {
      dispatch(setSort(sortTypes[3]));
      dispatch(setCategory(categories[0]));
    }
    if (status === Status.LOADING) dispatch(fetchAssortment());
  }, []);

  React.useEffect(() => {
    if (status === Status.SUCCESS)
      dispatch(sortItems([currentSortType.engTitle, currentCategory.engTitle]));
  }, [currentCategory, status]);

  React.useEffect(() => {
    if (status === Status.SUCCESS) {
      let filterParameter = qs.stringify(
        currentCategory.engTitle === 'drinkables'
          ? {
              category: currentCategory.engTitle,
              subcategory: currentSubcategory.engTitle,
              sortBy: currentSortType.engTitle,
            }
          : {
              category: currentCategory.engTitle,
              sortBy: currentSortType.engTitle,
            },
      );
      navigate(`?${filterParameter.replace('%2B', '(asc)')}`);
    }
  }, [currentSortType, currentCategory, currentSubcategory]);

  const showAssortment = (status: string) => {
    if (status === Status.LOADING) {
      return [...Array(6)].map((_, i) => <LoadingCard key={i} />);
    } else if (status === Status.ERROR) {
      return <FetchError />;
    } else {
      return assortment[currentCategory.engTitle].map((item: AssortmentItem) => {
        if (currentCategory.engTitle === 'drinkables') {
          return (
            item.subcategory === currentSubcategory.ruTitle && (
              <AssortmentCard key={item.id} item={item} />
            )
          );
        } else {
          return <AssortmentCard key={item.id} item={item} />;
        }
      });
    }
  };

  return <div className={styles.assortment}>{showAssortment(status)}</div>;
};
