import React from 'react';
import { useAppDispatch, useAppSelector } from '../../Hooks/hooks';

import {
  AssortmentCard,
  FetchError,
  Check,
  DeliveryRegion,
  LoadingCard,
  Navigation,
} from '../../componenst';

import {
  AssortmentItem,
  fetchAssortment,
  selectAssortment,
  Status,
} from '../../redux/slices/assortmentSlice';
import { selectFilters, setCategory } from '../../redux/slices/filtersSlice';

import styles from './Cart.module.scss';

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentCategory, categories, currentSubcategory } = useAppSelector(selectFilters);
  const { assortment, status } = useAppSelector(selectAssortment);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  return (
    <div className={styles.cart}>
      <div>
        <DeliveryRegion />
        <Check />
      </div>
      <div className={styles.categories}>
        <h3>ДОБАВИТЬ ЧТО-ТО ЕЩЁ?</h3>
        <div>
          <Navigation navRange={[-4, categories.length]} isFixed={false} />        
        </div>
      </div>
      <div className={styles.items}>{showAssortment(status)}</div>
    </div>
  );
};

export default Cart;
