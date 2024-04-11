import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import deliveryBoy from '../../../assets/icons/deliveryBoy.svg';
import { FetchStatus } from '../../../models';
import { useAppStore } from '../../../redux/store';

import styles from './OrderButton.module.scss';


export const OrderButton: React.FC = () => {
  const { deliveryStore, orderStore, modalStore, userStore } = useAppStore()
  const { phoneNumber } = userStore.getters;
  const { getters: { status }, actions: { getOrder } } = orderStore;
  const { currentRegion } = deliveryStore.getters;
  const { showGetPhone } = modalStore.actions
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const orderButtonClass =
    status === FetchStatus.LOADING
      ? styles.order_button + ` ` + styles.sending_order
      : styles.order_button;

  const onClickOrder = pathname.includes('cart')
    ? () => {
      if (phoneNumber) {
        getOrder();
      } else {
        showGetPhone();
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
