import React from 'react';

import { useAppDispatch, useAppSelector } from '../../Hooks/hooks';
import { selectFilters, setSort } from '../../redux/slices/filtersSlice';
import { sortItems } from '../../redux/slices/assortmentSlice';

import styles from './Sort.module.scss';

type SortParams = {
  ruTitle: string;
  engTitle: string;
};

export const Sort: React.FC = () => {
  const [visibility, setVisibility] = React.useState(false);
  const { currentSortType, currentCategory, sortTypes } = useAppSelector(selectFilters);
  const dispatch = useAppDispatch();
  const sortRef = React.useRef<HTMLDivElement>(null);

  const switchSortType = (sortType: SortParams) => {
    dispatch(setSort(sortType));
    setVisibility(!visibility);
    dispatch(sortItems([sortType.engTitle, currentCategory.engTitle]));
  };

  React.useEffect(() => {
    const handleClickSort = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) setVisibility(false);
    };
    document.body.addEventListener('click', handleClickSort);
    return () => document.body.removeEventListener('click', handleClickSort);
  }, []);

  return (
    <div ref={sortRef} className={styles.sort}>
      Сортировка по{' '}
      <span onClick={() => setVisibility(!visibility)}>{currentSortType.ruTitle}</span>
      <svg
        onClick={() => setVisibility(!visibility)}
        width="15"
        height="10"
        viewBox={'0 0 30 21'}
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M2.5 19L15 4L27.5 19" stroke="white" strokeWidth="4" strokeLinecap="round" />
      </svg>
      {visibility && (
        <div className={styles.optionsList}>
          {sortTypes.map((type) => (
            <p
              onClick={() => switchSortType(type)}
              className={currentSortType.engTitle === type.engTitle ? styles.active : ''}
              key={type.engTitle}>
              {type.ruTitle}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};
