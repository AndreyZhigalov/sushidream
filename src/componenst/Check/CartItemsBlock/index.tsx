import React from 'react';
import { useAppSelector } from '../../../Hooks/hooks';

import { CartItem } from '../CartItem';
import { EmptyCartWarning } from '../EmptyCartWarning';

import styles from './CartItemsBlock.module.scss';

export const CartItemsBlock: React.FC = () => {
  const { cartItems } = useAppSelector((state) => state.cart);

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
