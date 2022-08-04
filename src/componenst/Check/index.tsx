import React from 'react';
import { useAppSelector, useAppDispatch } from '../../Hooks/hooks';

import trash from '../../assets/icons/trash.svg';

import { selectCart, clearCart, CartStatus, fetchCart } from '../../redux/slices/cartSlice';
import { TotalCost } from './TotalCost';
import { OrderButton } from './OrderButton';

import styles from './Check.module.scss';
import { CartItemsBlock } from './CartItemsBlock';

export const Check: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const { count, cartStatus } = useAppSelector(selectCart);

  React.useEffect(() => {
    if (cartStatus === CartStatus.LOADING) {
      dispatch(fetchCart());
    }
  }, []);

  return (
    <div className={styles.check}>
      {count > 0 && <img src={trash} alt="Clear cart" onClick={() => dispatch(clearCart())} />}
      <h2>ВАШ ЗАКАЗ</h2>
      <CartItemsBlock />
      <TotalCost />
      {count > 0 && <OrderButton />}
    </div>
  );
});
