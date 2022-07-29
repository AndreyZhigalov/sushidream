import React from 'react';

import { useAppDispatch, useAppSelector } from '../../Hooks/hooks';
import { selectFilters, setCategory } from '../../redux/slices/filtersSlice';

import styles from './Navigation.module.scss';

export const Navigation: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentCategory, categories } = useAppSelector(selectFilters);

  return (
    <nav className={styles.navigation}>
      <ul>
        {categories.map((category: any) => (
          <li
            key={category.engTitle}
            onClick={() => {
              dispatch(setCategory(category));
            }}
            className={currentCategory.engTitle === category.engTitle ? styles.active : ''}>
            {category.ruTitle}
          </li>
        ))}
      </ul>
    </nav>
  );
};
