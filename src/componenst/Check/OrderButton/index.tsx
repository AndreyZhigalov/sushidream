import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import deliveryBoy from '../../../assets/icons/deliveryBoy.svg';
import { useAppDispatch, useAppSelector } from '../../../Hooks/hooks';
import { getOrder, OrderStatus, selectCart } from '../../../redux/slices/cartSlice';
import { selectDelivery } from '../../../redux/slices/deliverySlice';
import { showGetPhone } from '../../../redux/slices/modalWindowSlice';

import styles from './OrderButton.module.scss';

export const OrderButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const phone = useAppSelector((state) => state.user.phoneNumber);
  const { orderStatus } = useAppSelector(selectCart);
  const { currentRegion } = useAppSelector(selectDelivery);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const orderButtonClass =
    orderStatus === OrderStatus.SENDING
      ? styles.order_button + ` ` + styles.sending_order
      : styles.order_button;

  const onClickOrder = pathname.includes('cart')
    ? () => {
        if (phone) {
          dispatch(getOrder());
        } else {
          dispatch(showGetPhone());
        }
      }
    : () => navigate('cart');

  return (
    <button className={orderButtonClass} onClick={onClickOrder}>
      {currentRegion === 'Самовывоз' ? 'Оформить заказ' : 'Оформить доставку'}
      {currentRegion !== 'Самовывоз' && <img height={30} src={deliveryBoy} alt="deliveryBoy" />}
    </button>
  );
};
