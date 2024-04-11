import qs from 'qs';
import { useLocation, useNavigate } from 'react-router-dom';
import { setSpecials } from '../../../utils/setSpecials';
import { useAppStore } from '../../../redux/store';
import { AssortmentItem } from '../../../redux/slices/assortment';

import styles from './AssortmentCard.module.scss';

export const AssortmentCard: React.FC<{ item: AssortmentItem }> = ({ item }) => {
  const { assortmentStore, cartStore, filtersStore } = useAppStore();
  const {
    getters: { specials },
    actions: { findItem },
  } = assortmentStore;
  const { currentCategory, currentSortType } = filtersStore.getters;
  const { addToCart } = cartStore.actions;
  const navigate = useNavigate();
  const { pathname } = useLocation();

  let itemLink: string = pathname.includes('cart')
    ? qs.stringify({
        item: item.id,
      })
    : qs.stringify({
        category: currentCategory.value,
        sortBy: currentSortType.value,
        item: item.id,
      });

  const getItem = (id: number, link: string) => {
    findItem(id);
    navigate(`?${link}`);
  };

  return (
    <div className={styles.card}>
      <img
        src={item.dishPhoto}
        alt=""
        onClick={() => getItem(item.id, itemLink)}
        loading="lazy"
        decoding="async"
      />
      <h3>{item.title}</h3>
      <div className={styles.short_description}>
        <div>
          <p>КОЛ-ВО: {item.portion}</p>
          <span>{item.price}&#x20bd;</span>
        </div>
        <div>{setSpecials(item, specials)}</div>
        <button onClick={() => addToCart(item)} className={styles.add}></button>
      </div>
    </div>
  );
};
