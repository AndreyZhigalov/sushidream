import React from 'react';

import { AssortmentCard } from '../../componenst/AssortmentBlock/AssortmentCard';
import { FetchError } from '../../componenst/AssortmentBlock/FetchError';
import { Check } from '../../componenst/Check';
import { DeliveryRegion } from '../../componenst/DeliveryRegion';
import { LoadingCard } from '../../componenst/LoadingCard';
import { Navigation } from '../../componenst/Navigation';
import { useAppDispatch, useAppSelector } from '../../Hooks/hooks';
import {
  AssortmentItem,
  fetchAssortment,
  selectAssortment,
  Status,
} from '../../redux/slices/assortmentSlice';
import { selectFilters, setCategory } from '../../redux/slices/filtersSlice';

import styles from './Cart.module.scss';

export const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentCategory, categories } = useAppSelector(selectFilters);
  const { assortment, status } = useAppSelector(selectAssortment);
  window.scrollTo(0, 0);

  React.useEffect(() => {
    dispatch(setCategory(categories[16]));
    if (status === Status.LOADING) {
      dispatch(fetchAssortment());
    }
  }, []);

  const showAssortment = (status: string) => {
    if (status === Status.LOADING) {
      return [...Array(6)].map((_, i) => <LoadingCard key={i} />);
    } else if (status === Status.ERROR) {
      return <FetchError />;
    } else {
      return assortment[currentCategory.engTitle].map((item: AssortmentItem) => (
        <AssortmentCard key={item.id} item={item} />
      ));
    }
  };

  return (
    <div className={styles.cart}>
      <div>
        <DeliveryRegion />
        <Check />
      </div>
      <div className={styles.categories}>
        <h3>ДОБАВИТЬ ЧТО-ТО ЕЩЁ?</h3>
        <div>
          <Navigation navRange={[-4, categories.length]} />
        </div>
      </div>
      <div className={styles.items}>{showAssortment(status)}</div>
    </div>
  );
};
