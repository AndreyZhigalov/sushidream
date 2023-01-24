import { useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../Hooks/hooks';
import { CurrentSortState, selectFilters, setSubcategory } from '../../redux/slices/filtersSlice';

import styles from './Subcategories.module.scss';

export const Subcategories = () => {
  const dispatch = useAppDispatch();
  const { currentSubcategory, subcategories } = useAppSelector(selectFilters);
  const { pathname } = useLocation();

  const setClass = (category: CurrentSortState, location: string) => {
    if (location.includes('cart')) {
      return currentSubcategory.engTitle === category.engTitle
        ? `${styles.active} ${styles.subcategory_cart}`
        : styles.subcategory_cart;
    } else {
      return currentSubcategory.engTitle === category.engTitle ? styles.active : '';
    }
  };

  return (
    <ul className={styles.subcategories}>
      {subcategories.map((category: any) => (
        <li
          key={category.engTitle}
          onClick={() => {
            dispatch(setSubcategory(category));
          }}
          className={setClass(category, pathname)}>
          {category.ruTitle}
        </li>
      ))}
    </ul>
  );
};
