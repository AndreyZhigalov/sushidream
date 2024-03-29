import qs from 'qs';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../Hooks/hooks';
import { AssortmentItem, findItem, selectAssortment } from '../../../redux/slices/assortmentSlice';
import { addToCart } from '../../../redux/slices/cartSlice';
import { selectFilters } from '../../../redux/slices/filtersSlice';
import { setSpecials } from '../../../utils/setSpecials';

import styles from './AssortmentCard.module.scss';

export const AssortmentCard: React.FC<{ item: AssortmentItem }> = ({ item }) => {
  const dispatch = useAppDispatch();
  const { specials } = useAppSelector(selectAssortment);
  const { currentCategory, currentSortType } = useAppSelector(selectFilters);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  let itemLink: string = pathname.includes('cart')
    ? qs.stringify({
        item: item.id,
      })
    : qs.stringify({
        category: currentCategory.engTitle,
        sortBy: currentSortType.engTitle,
        item: item.id,
      });

  const getItem = (id: number, link: string) => {
    dispatch(findItem(id));
    navigate(`?${link}`);
  };

  return (
    <div className={styles.card}>
      <img src={item.dishPhoto} alt="" onClick={() => getItem(item.id, itemLink)} />
      <h3>{item.title}</h3>
      <div className={styles.short_description}>
        <div>
          <p>КОЛ-ВО: {item.portion}</p>
          <span>{item.price}&#x20bd;</span>
        </div>
        <div>{setSpecials(item, specials)}</div>
        <button onClick={() => dispatch(addToCart(item))} className={styles.add}></button>
      </div>
    </div>
  );
};
