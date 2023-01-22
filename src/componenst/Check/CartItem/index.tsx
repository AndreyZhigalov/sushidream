import React from 'react';

import { useAppDispatch } from '../../../Hooks/hooks';
import { AssortmentItem } from '../../../redux/slices/assortmentSlice';
import { addToCart, removeFromCart } from '../../../redux/slices/cartSlice';
import { confirmAlert } from '../../../redux/slices/modalWindowSlice';

import styles from './CartItem.module.scss';

export const CartItem: React.FC<{ item: AssortmentItem }> = ({ item }) => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.cart_item}>
      <img src={item.dishPhoto} alt="товар" />
      <p>
        {item.count} x {item.title}
      </p>
      <span>{item.price * item.count}&#x20bd;</span>
      <div className={styles.item_count}>
        <button
          onClick={() => {
            item.count > 1
              ? dispatch(removeFromCart(item.id))
              : dispatch(
                  confirmAlert({
                    message: `Удалить ${item.title} из корзины?`,
                    type: 'remove',
                    removeID: item.id,
                  }),
                );
          }}>
          -
        </button>
        <span>{item.count}</span>
        <button onClick={() => dispatch(addToCart(item))}>+</button>
      </div>
    </div>
  );
};
