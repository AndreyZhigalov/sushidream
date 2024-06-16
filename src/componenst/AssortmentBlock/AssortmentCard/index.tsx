import qs from 'qs';
import { useLocation, useNavigate } from 'react-router-dom';
import { setSpecials } from '../../../utils/setSpecials';
import {
  AssortmentItem,
  useAssortmentActions,
  useAssortmentGetters,
} from '../../../redux/slices/assortment';
import { localPrice } from '../../../utils/localPrice';
import { useCartActions } from '../../../redux/slices/cart';
import { useFiltersGetters } from '../../../redux/slices/filters';
import { useCallback } from 'react';
import { ASSORTMENT_BACKGROUND_IMAGE } from '../../../constants/assortmentBackgroundImage';

import styles from './AssortmentCard.module.scss';
import { ROUTES } from '../../../constants/routes';

export const AssortmentCard: React.FC<{ item: AssortmentItem }> = ({ item }) => {
  const { findItem } = useAssortmentActions();
  const { specials } = useAssortmentGetters();
  const { currentCategory, currentSortType } = useFiltersGetters();
  const { addToCart } = useCartActions();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const itemLink: string = pathname.includes(ROUTES.cart)
    ? qs.stringify({
        item: item.id,
      })
    : qs.stringify({
        category: currentCategory.value,
        sortBy: currentSortType.value,
        item: item.id,
      });

  const getItem = useCallback((id: number, link: string) => {
    findItem(id);
    navigate(`?${link}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.card}>
      <img
        className={styles.cover}
        src={item.dishPhoto}
        alt=""
        style={{
          backgroundImage: `url(${ASSORTMENT_BACKGROUND_IMAGE})`,
        }}
        onClick={() => getItem(item.id, itemLink)}
        loading="lazy"
        decoding="async"
      />
      <h3 className={styles.title}>{item.title}</h3>
      <div className={styles.short_description}>
        <div className={styles.column}>
          <span className={styles.portion}>КОЛ-ВО: {item.portion}</span>
          <span className={styles.price}>{localPrice(item.price)}</span>
        </div>
        <div className={styles.specials_container}>{setSpecials(item, specials)}</div>
        <button onClick={() => addToCart(item)} className={styles.add}></button>
      </div>
    </div>
  );
};
