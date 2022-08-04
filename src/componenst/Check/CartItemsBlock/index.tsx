import React from 'react';
import { useAppSelector } from '../../../Hooks/hooks';
import { OrderStatus, selectCart } from '../../../redux/slices/cartSlice';

import { CartItem } from '../CartItem';
import { EmptyCartWarning } from '../EmptyCartWarning';
import { OrderedWarning } from '../OrderedWarning';

import styles from './CartItemsBlock.module.scss';

export const CartItemsBlock: React.FC = () => {
  const { cartItems, orderStatus } = useAppSelector(selectCart);

  return (
    <div className={styles.itemsBlock}>
      {cartItems.length > 0 ? (
        cartItems.map((item: any) => <CartItem item={item} key={item.id} />)
      ) : orderStatus === OrderStatus.SUCCESS ? (
        <OrderedWarning />
      ) : (
        <EmptyCartWarning />
      )}
    </div>
  );
};
