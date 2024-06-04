import { useLocation } from 'react-router-dom';
import { Subcategories } from '../Subcategories';
import mainStyles from '../../scss/index.module.scss';
import { useAppStore } from '../../redux/store';
import classNames from 'classnames';

import styles from './CategoryList.module.scss';

export const CategoryList: React.FC<{ navRange: number[]; isFixed: boolean }> = ({
  navRange,
  isFixed,
}) => {
  const { filtersStore } = useAppStore();
  const { currentCategory, categories } = filtersStore.getters;
  const { setCategory } = filtersStore.actions;
  const { pathname } = useLocation();

  return (
    <nav className={styles.container}>
      <ul className={classNames(styles.list, { [mainStyles.fixed]: isFixed })}>
        {categories.slice(navRange[0], navRange[1]).map((category) => (
          <li
            key={category.value}
            onClick={() => {
              setCategory(category);
            }}
            className={classNames(styles.item, {
              [styles.active]: currentCategory.value === category.value,
              [styles.margin]: !pathname.includes('cart'),
            })}>
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
