
import { useEffect, useRef, useState } from 'react';
import styles from './Sort.module.scss';
import { useAppStore } from '../../redux/store';

type SortParams = {
  name: string;
  value: string;
};

export const Sort: React.FC = () => {
  const [visibility, setVisibility] = useState(false);
  const { filtersStore, assortmentStore } = useAppStore()
  const { currentSortType, sortTypes } = filtersStore.getters;
  const { setSort } = filtersStore.actions;
  const { sortItems } = assortmentStore.actions;
  const sortRef = useRef<HTMLDivElement>(null);

  const switchSortType = (sortType: SortParams) => {
    setSort(sortType);
    setVisibility(!visibility);
    sortItems(sortType.value);
  };

  useEffect(() => {
    const handleClickSort = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) setVisibility(false);
    };
    document.body.addEventListener('click', handleClickSort);
    return () => document.body.removeEventListener('click', handleClickSort);
  }, []);

  return (
    <div ref={sortRef} className={styles.sort}>
      Сортировка по{' '}
      <span onClick={() => setVisibility(!visibility)}>{currentSortType.name}</span>
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
        <div className={styles.options_list}>
          {sortTypes.map((type) => (
            <p
              onClick={() => switchSortType(type)}
              className={currentSortType.value === type.value ? styles.active : ''}
              key={type.value}>
              {type.name}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};
