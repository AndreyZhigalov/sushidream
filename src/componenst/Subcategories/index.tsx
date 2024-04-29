import { useLocation } from 'react-router-dom';

import styles from './Subcategories.module.scss';
import { SortItem } from '../../models';
import { useAppStore } from '../../redux/store';

export const Subcategories = () => {
  const { filtersStore } = useAppStore();
  const { currentSubcategory, subcategories } = filtersStore.getters;
  const { setSubcategory } = filtersStore.actions;
  const { pathname } = useLocation();

  const setClass = (category: SortItem, location: string) => {
    if (location.includes('cart')) {
      return currentSubcategory.value === category.value
        ? `${styles.active} ${styles.subcategory_cart}`
        : styles.subcategory_cart;
    } else {
      return currentSubcategory.value === category.value ? styles.active : '';
    }
  };

  return (
    <ul className={styles.subcategories}>
      {subcategories.map((category) => (
        <li
          key={category.value}
          onClick={() => {
            setSubcategory(category);
          }}
          className={setClass(category, pathname)}>
          {category.name}
        </li>
      ))}
    </ul>
  );
};
