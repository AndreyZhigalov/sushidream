import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../Hooks/hooks';
import { CurrentSortState, selectFilters, setCategory } from '../../redux/slices/filtersSlice';

import { Subcategories } from '../Subcategories';

import mainStyles from '../../scss/index.module.scss';
import styles from './Navigation.module.scss';

export const Navigation: React.FC<{ navRange: number[]; isFixed: boolean }> = ({
  navRange,
  isFixed,
}) => {
  const dispatch = useAppDispatch();
  const { currentCategory, categories } = useAppSelector(selectFilters);
  const { pathname } = useLocation();

  const setClass = (category: CurrentSortState, location: string) => {
    if (currentCategory.engTitle === category.engTitle) {
      return location.includes('cart') ? styles.active : styles.active + ' ' + styles.li_margin;
    } else {
      return location.includes('cart') ? '' : '' + styles.li_margin;
    }
  };

  return (
    <nav className={styles.navigation}>
      <ul className={isFixed ? mainStyles.fixed : ''}>
        {categories.slice(navRange[0], navRange[1]).map((category: any) => (
          <li
            key={category.engTitle}
            onClick={() => {
              dispatch(setCategory(category));
            }}
            className={setClass(category, pathname)}>
            {category.ruTitle}
            {category.engTitle === 'drinkables' &&  currentCategory.engTitle === 'drinkables' && <Subcategories />}
          </li>
        ))}
      </ul>
    </nav>
  );
};
