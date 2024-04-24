import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import deliveryBoy from '../../../assets/icons/deliveryBoy.svg';
import { FetchStatus } from '../../../models';
import { useAppStore } from '../../../redux/store';
import GetPhone from '../../Modal/GetPhone';

import styles from './OrderButton.module.scss';

export const OrderButton: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { deliveryStore, orderStore, userStore } = useAppStore();
  const { phoneNumber, email } = userStore.getters;
  const {
    getters: { status },
    actions: { getOrder },
  } = orderStore;
  const { currentRegion } = deliveryStore.getters;
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const orderButtonClass =
    status === FetchStatus.LOADING
      ? styles.order_button + ` ` + styles.sending_order
      : styles.order_button;

  const onClickOrder = pathname.includes('cart')
    ? () => {
        if (phoneNumber ?? email) {
          getOrder();
        } else {
          setShowModal(true);
        }
      }
    : () => navigate('cart');

  return (
    <>
      <GetPhone isOpen={showModal} />
      <button className={orderButtonClass} onClick={onClickOrder}>
        {currentRegion === 'Самовывоз' ? 'Оформить заказ' : 'Оформить доставку'}
        {currentRegion !== 'Самовывоз' && <img height={30} src={deliveryBoy} alt="deliveryBoy" />}
      </button>
    </>
  );
};
