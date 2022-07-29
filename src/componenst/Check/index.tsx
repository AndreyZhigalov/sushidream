import React from 'react';
import { useAppSelector, useAppDispatch } from '../../Hooks/hooks';

import trash from '../../assets/icons/trash.svg';

import { clearCart } from '../../redux/slices/cartSlice';
import { TotalCost } from './TotalCost';
import { OrderButton } from './OrderButton';

import styles from './Check.module.scss';
import { CartItemsBlock } from './CartItemsBlock';

export const Check: React.FC = () => {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.cart.count);

  return (
    <div className={styles.check}>
      {count > 0 && <img src={trash} alt="Clear cart" onClick={() => dispatch(clearCart())} />}
      <h2>ВАШ ЗАКАЗ</h2>
      <CartItemsBlock />
      <TotalCost />
      <OrderButton />
    </div>
  );
};
