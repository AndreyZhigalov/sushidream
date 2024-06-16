import qs from 'qs';
import { useNavigate, useLocation } from 'react-router-dom';
import { AssortmentCard } from './AssortmentCard';
import { LoadingCard } from '../LoadingCard';
import { FetchError } from './FetchError';
import { FetchStatus } from '../../models';

import {
  AssortmentItem,
  useAssortmentActions,
  useAssortmentGetters,
} from '../../redux/slices/assortment';
import { useFiltersGetters } from '../../redux/slices/filters';
import { useFilterParams } from '../../Hooks/useFilterParams';

import { useEffect } from 'react';

import styles from './AssortmentBlock.module.scss';

export const AccortmentBlock: React.FC = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { findItem, get, sortItems } = useAssortmentActions();
  const { status, items } = useAssortmentGetters();
  const { currentSortType, currentCategory, searchedItemId, currentSubcategory } =
    useFiltersGetters();

  useFilterParams(search);

  useEffect(() => {
    if (status === FetchStatus.SUCCESS && searchedItemId) {
      findItem(searchedItemId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

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
      get(currentCategory.value);
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
