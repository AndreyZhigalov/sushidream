import React from 'react';

import deliveryBoy from '../../../assets/icons/deliveryBoyColor.svg';
import { useAppSelector } from '../../../Hooks/hooks';
import { selectCart } from '../../../redux/slices/cartSlice';

import styles from './OrderedWarning.module.scss';

export const OrderedWarning: React.FC = () => {
  const { orderId } = useAppSelector(selectCart);

  return (
    <div className={styles.ordered}>
      <img src={deliveryBoy} alt="Внимание" />
      <p>
        {`Доставка заказа №${orderId} оформлена!`}
        <br />
        Скоро с вами свяжется курьер.
      </p>
    </div>
  );
};
