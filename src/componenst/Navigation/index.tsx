import React from 'react';
import { useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../Hooks/hooks';
import { CurrentSortState, selectFilters, setCategory } from '../../redux/slices/filtersSlice';

import styles from './Navigation.module.scss';

export const Navigation: React.FC<{ navRange: number[] }> = ({ navRange }) => {
  const dispatch = useAppDispatch();
  const { currentCategory, categories } = useAppSelector(selectFilters);
  const { pathname } = useLocation();

  const setClass = (category: CurrentSortState, location: string) => {
    if (currentCategory.engTitle === category.engTitle) {
      return pathname.includes('cart') ? styles.active : styles.active + ' ' + styles.li_Margin;
    } else {
      return pathname.includes('cart') ? '' : '' + styles.li_Margin;
    }
  };

  return (
    <nav className={styles.navigation}>
      <ul>
        {categories.slice(navRange[0], navRange[1]).map((category: any) => (
          <li
            key={category.engTitle}
            onClick={() => {
              dispatch(setCategory(category));
            }}
            className={setClass(category, pathname)}>
            {category.ruTitle}
          </li>
        ))}
      </ul>
    </nav>
  );
};
