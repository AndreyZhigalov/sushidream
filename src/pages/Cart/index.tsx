import {
  AssortmentCard,
  FetchError,
  Check,
  DeliveryRegion,
  LoadingCard,
  CategoryList,
} from '../../componenst';

import { FetchStatus } from '../../models';
import { useEffect } from 'react';
import { useAppStore } from '../../redux/store';
import { AssortmentItem } from '../../redux/slices/assortment';
import styles from './Cart.module.scss';

const Cart: React.FC = () => {
  const { filtersStore, assortmentStore } = useAppStore();
  const { currentCategory, categories, currentSubcategory } = filtersStore.getters;
  const { setCategory } = filtersStore.actions;
  const { items, status } = assortmentStore.getters;
  const { getByCategory } = assortmentStore.actions;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (status === FetchStatus.SUCCESS) {
      getByCategory(currentCategory.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCategory, currentSubcategory]);

  useEffect(() => {
    setCategory(categories[16]);
    getByCategory(categories[16].value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showAssortment = () => {
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

  return (
    <div className={styles.cart}>
      <div>
        <DeliveryRegion />
        <Check />
      </div>
      <div className={styles.categories}>
        <h3>ДОБАВИТЬ ЧТО-ТО ЕЩЁ?</h3>
        <div>
          <CategoryList navRange={[-4, categories.length]} isFixed={false} />
        </div>
      </div>
      <div className={styles.items}>{showAssortment()}</div>
    </div>
  );
};

export default Cart;
