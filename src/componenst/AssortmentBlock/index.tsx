import qs from 'qs';
import { useNavigate, useLocation } from 'react-router-dom';
import { AssortmentCard } from './AssortmentCard';
import { LoadingCard } from '../LoadingCard';
import { FetchError } from './FetchError';
import { FetchStatus, SortItem } from '../../models';

import {
  AssortmentItem,
  useAssortmentActions,
  useAssortmentGetters,
} from '../../redux/slices/assortment';

import { useEffect } from 'react';

import styles from './AssortmentBlock.module.scss';
import { useFiltersActions, useFiltersGetters } from '../../redux/slices/filters';

export const AccortmentBlock: React.FC = () => {
  const navigate = useNavigate();
  const { search } = useLocation();

  const { findItem, getAll, getByCategory, sortItems } = useAssortmentActions();
  const { status, items } = useAssortmentGetters();
  const { setCategory, setSubcategory, setSort, setSearchedItemId } = useFiltersActions();
  const {
    currentSortType,
    currentCategory,
    categories,
    sortTypes,
    searchedItemId,
    currentSubcategory,
    subcategories,
  } = useFiltersGetters();

  useEffect(() => {
    if (status === FetchStatus.SUCCESS && searchedItemId) {
      findItem(searchedItemId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useEffect(() => {
    if (search) {
      const searchParameters = qs.parse(search.substring(1).replace('(asc)', '%2B'));
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
  }, []);

  useEffect(() => {
    if (status === FetchStatus.SUCCESS) sortItems(currentSortType.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCategory, status]);

  useEffect(() => {
    if (status === FetchStatus.SUCCESS) {
      const filterParameter = qs.stringify(
        currentCategory.value === 'drinkables'
          ? {
              category: currentCategory.value,
              subcategory: currentSubcategory.value,
              sortBy: currentSortType.value,
            }
          : {
              category: currentCategory.value,
              sortBy: currentSortType.value,
            },
      );
      navigate(`?${filterParameter.replace('%2B', '(asc)')}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSortType, currentCategory, currentSubcategory]);

  useEffect(() => {
    if (status === FetchStatus.SUCCESS) {
      getByCategory(currentCategory.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCategory, currentSubcategory]);

  const showAssortment = (status: string) => {
    if (status === FetchStatus.LOADING) {
      return [...Array(6)].map((_, i) => <LoadingCard key={i} />);
    } else if (status === FetchStatus.ERROR) {
      return <FetchError />;
    } else {
      // return assortment[currentCategory.value].map((item: AssortmentItem) => {
      return items?.map((item: AssortmentItem) => {
        if (currentCategory.value === 'drinkables') {
          return (
            item.subcategory === currentSubcategory.name && (
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
