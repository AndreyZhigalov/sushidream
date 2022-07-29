import React from 'react';

import { useAppDispatch } from '../../../Hooks/hooks';
import { addToCart, removeFromCart } from '../../../redux/slices/cartSlice';

import styles from './CartItem.module.scss';

type CartItemProps = {
  item: {
    dishPhoto: string;
    count: number;
    title: string;
    price: number;
  };
};

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.cartItem}>
      <img src={item.dishPhoto} alt="товар" />
      <p>
        {item.count} x {item.title}
      </p>
      <span>{item.price * item.count}&#x20bd;</span>
      <div className={styles.itemcount}>
        <button onClick={() => dispatch(removeFromCart(item))}>-</button>
        <span>{item.count}</span>
        <button onClick={() => dispatch(addToCart(item))}>+</button>
      </div>
    </div>
  );
};
