import { useLocation } from 'react-router-dom';

import { Subcategories } from '../Subcategories';

import mainStyles from '../../scss/index.module.scss';
import styles from './CategoryList.module.scss';
import { SortItem } from '../../models';
import { useAppStore } from '../../redux/store';

export const CategoryList: React.FC<{ navRange: number[]; isFixed: boolean }> = ({
  navRange,
  isFixed,
}) => {
  const { filtersStore } = useAppStore()
  const { currentCategory, categories, } = filtersStore.getters;
  const { setCategory, } = filtersStore.actions;
  const { pathname } = useLocation();

  const setClass = (category: SortItem, location: string) => {
    if (currentCategory.value === category.value) {
      return location.includes('cart') ? styles.active : styles.active + ' ' + styles.li_margin;
    } else {
      return location.includes('cart') ? '' : '' + styles.li_margin;
    }
  };

  return (
    <nav className={styles.category_list}>
      <ul className={isFixed ? mainStyles.fixed : ''}>
        {categories.slice(navRange[0], navRange[1]).map((category: any) => (
          <li
            key={category.value}
            onClick={() => {
              setCategory(category);
            }}
            className={setClass(category, pathname)}>
            {category.name}
            {category.value === 'drinkables' && currentCategory.value === 'drinkables' && (
              <Subcategories />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
