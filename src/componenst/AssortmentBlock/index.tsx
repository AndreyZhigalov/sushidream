import React from 'react';
import qs from 'qs';
import { useNavigate, useLocation } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../../Hooks/hooks';
import {
  sortItems,
  fetchAssortment,
  selectAssortment,
  AssortmentItem,
} from '../../redux/slices/assortmentSlice';
import {
  CurrentSortState,
  selectFilters,
  setCategory,
  setSort,
} from '../../redux/slices/filtersSlice';
import { AssortmentCard } from './AssortmentCard';
import { LoadingCard } from '../LoadingCard';
import { FetchError } from './FetchError';

import styles from './AssortmentBlock.module.scss';

export const AccortmentBlock: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();
  const { currentSortType, currentCategory, categories, sortTypes } = useAppSelector(selectFilters);
  const { assortment, status } = useAppSelector(selectAssortment);

  React.useEffect(() => {
    if (status === 'success')
      dispatch(sortItems([currentSortType.engTitle, currentCategory.engTitle]));
  }, [currentCategory, status]);

  React.useEffect(() => {
    if (search) {
      let searchParameters = qs.parse(search.substring(1).replace('(asc)', '%2B'));
      let category = categories.find(
        (obj: CurrentSortState) => obj.engTitle === searchParameters.category,
      );
      let sort = sortTypes.find(
        (obj: CurrentSortState) => obj.engTitle === searchParameters.sortBy,
      );
      if (category) dispatch(setCategory(category));
      if (sort) dispatch(setSort(sort));
    } else {
      dispatch(setSort(sortTypes[3]));
      dispatch(setCategory(categories[0]));
    }
    dispatch(fetchAssortment());
  }, []);

  React.useEffect(() => {
    if (status === 'success') {
      let filterParameter = qs.stringify({
        category: currentCategory.engTitle,
        sortBy: currentSortType.engTitle,
      });
      navigate(`?${filterParameter.replace('%2B', '(asc)')}`);
    }
  }, [currentSortType, currentCategory]);

  const showAssortment = (status: string) => {
    if (status === 'loading') {
      return [...Array(6)].map((_, i) => <LoadingCard key={i} />);
    } else if (status === 'error') {
      return <FetchError />;
    } else {
      return assortment[currentCategory.engTitle].map((item: AssortmentItem) => (
        <AssortmentCard key={item.id} item={item} />
      ));
    }
  };

  return <div className={styles.assortment}>{showAssortment(status)}</div>;
};
