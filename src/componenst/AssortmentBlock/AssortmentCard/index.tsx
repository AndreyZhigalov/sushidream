import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../Hooks/hooks';
import { AssortmentItem, selectAssortment } from '../../../redux/slices/assortmentSlice';
import { addToCart } from '../../../redux/slices/cartSlice';

import styles from './AssortmentCard.module.scss';

export const AssortmentCard: React.FC<{ item: AssortmentItem }> = ({ item }) => {
  const dispatch = useAppDispatch();
  const { specials } = useAppSelector(selectAssortment);
  const navigate = useNavigate();

  const setSpecials = () => {
    return specials.map((icon: string) => {
      return item.specifics.find((link) => icon.toLowerCase().includes(link.toLowerCase())) ? (
        <img key={icon} src={icon} alt="Особенность" />
      ) : (
        false
      );
    });
  };

  return (
    <div className={styles.card}>
      <img src={item.dishPhoto} alt="" onClick={() => navigate(`?item=${item.id}`)} />
      <h3>{item.title}</h3>
      <div className={styles.shortDescription}>
        <div>
          <p>КОЛ-ВО: {item.portion}</p>
          <span>{item.price}&#x20bd;</span>
        </div>
        <div>{setSpecials()}</div>
        <button onClick={() => dispatch(addToCart(item))} className={styles.add}></button>
      </div>
    </div>
  );
};
