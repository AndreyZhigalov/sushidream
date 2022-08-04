import React from 'react';

import deliveryBoy from '../../../assets/icons/deliveryBoy.svg';
import { useAppDispatch, useAppSelector } from '../../../Hooks/hooks';
import { getOrder, OrderStatus, selectCart } from '../../../redux/slices/cartSlice';

import styles from './OrderButton.module.scss';

export const OrderButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const { orderStatus } = useAppSelector(selectCart);

  const orderButtonClass =
    orderStatus === OrderStatus.SENDING
      ? styles.orderButton + ` ` + styles.sendingOrder
      : styles.orderButton;

  return (
    <button className={orderButtonClass} onClick={() => dispatch(getOrder())}>
      Оформить доставку
      <img height={30} src={deliveryBoy} alt="deliveryBoy" />
    </button>
  );
};
