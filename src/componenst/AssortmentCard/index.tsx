import React from 'react';
import { useAppDispatch, useAppSelector } from '../../Hooks/hooks';
import { selectAssortment } from '../../redux/slices/assortmentSlice';
import { addToCart } from '../../redux/slices/cartSlice';

import styles from './AssortmentCard.module.scss';

type AssortmentProps = {
  item: {
    dishPhoto: string;
    title: string;
    portion: number;
    price: number;
    specifics: string[];
  };
};

export const AssortmentCard: React.FC<AssortmentProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const { specials } = useAppSelector(selectAssortment);

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
      <img src={item.dishPhoto} alt="" />
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
