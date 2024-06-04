import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Subcategories.module.scss';
import { SortItem } from '../../models';
import { useAppStore } from '../../redux/store';
import classNames from 'classnames';

export const Subcategories: React.FC = () => {
  const { filtersStore } = useAppStore();
  const { currentSubcategory, subcategories } = filtersStore.getters;
  const { setSubcategory } = filtersStore.actions;
  const { pathname } = useLocation();

  const setClass = (category: SortItem, location: string) => {
    if (location.includes('cart')) {
      return classNames(styles.item, {
        [styles.active]: currentSubcategory.value === category.value,
        [styles.cart_adjustment]: true,
      });
    } else {
      return classNames(styles.item, {
        [styles.active]: currentSubcategory.value === category.value,
      });
    }
  };

  return (
    <ul className={styles.items}>
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
