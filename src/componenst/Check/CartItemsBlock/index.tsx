import React from 'react';
import { useAppSelector } from '../../../Hooks/hooks';
import { cartSelector } from '../../../redux/slices/cartSlice';

import { CartItem } from '../CartItem';
import { EmptyCartWarning } from '../EmptyCartWarning';

import styles from './CartItemsBlock.module.scss';

export const CartItemsBlock: React.FC = () => {
  const { cartItems } = useAppSelector(cartSelector);

  return (
    <div className={styles.itemsBlock}>
      {cartItems.length > 0 ? (
        cartItems.map((item: any) => <CartItem item={item} key={item.id} />)
      ) : (
        <EmptyCartWarning />
      )}
    </div>
  );
};
