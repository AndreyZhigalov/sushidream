import React from 'react';

import deliveryBoy from '../../../assets/icons/deliveryBoy.svg';

import styles from './OrderButton.module.scss';

export const OrderButton: React.FC = () => {
  return (
    <button className={styles.orderButton}>
      Оформить доставку
      <img height={30} src={deliveryBoy} alt="deliveryBoy" />
    </button>
  );
};
