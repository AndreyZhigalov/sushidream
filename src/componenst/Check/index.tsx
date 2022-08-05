import React from 'react';
import { useAppSelector, useAppDispatch } from '../../Hooks/hooks';

import trash from '../../assets/icons/trash.svg';
import { selectCart, clearCart, CartStatus, fetchCart } from '../../redux/slices/cartSlice';
import { TotalCost } from './TotalCost';
import { OrderButton } from './OrderButton';
import { CartItemsBlock } from './CartItemsBlock';
import { selectDelivery } from '../../redux/slices/deliverySlice';

import styles from './Check.module.scss';

export const Check: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const { count, cartStatus } = useAppSelector(selectCart);
  const { currentRegion } = useAppSelector(selectDelivery);

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
      {count > 0 && currentRegion && <OrderButton />}
    </div>
  );
});
