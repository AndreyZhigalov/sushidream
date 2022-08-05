import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import deliveryBoy from '../../../assets/icons/deliveryBoy.svg';
import { useAppDispatch, useAppSelector } from '../../../Hooks/hooks';
import { getOrder, OrderStatus, selectCart } from '../../../redux/slices/cartSlice';
import { selectDelivery } from '../../../redux/slices/deliverySlice';

import styles from './OrderButton.module.scss';

export const OrderButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const { orderStatus } = useAppSelector(selectCart);
  const { currentRegion } = useAppSelector(selectDelivery);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const orderButtonClass =
    orderStatus === OrderStatus.SENDING
      ? styles.orderButton + ` ` + styles.sendingOrder
      : styles.orderButton;

  return (
    <button
      className={orderButtonClass}
      onClick={pathname.includes('cart') ? () => dispatch(getOrder()) : () => navigate('cart')}>
      {currentRegion === 'Самовывоз' ? 'Оформить заказ' : 'Оформить доставку'}
      {currentRegion !== 'Самовывоз' && <img height={30} src={deliveryBoy} alt="deliveryBoy" />}
    </button>
  );
};
