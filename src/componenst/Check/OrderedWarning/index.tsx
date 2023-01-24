import React from 'react';

import deliveryBoy from '../../../assets/icons/deliveryBoyColor.svg';
import ordered from '../../../assets/icons/ordered.svg';
import { useAppSelector } from '../../../Hooks/hooks';
import { selectCart } from '../../../redux/slices/cartSlice';
import { selectDelivery } from '../../../redux/slices/deliverySlice';

import styles from './OrderedWarning.module.scss';

export const OrderedWarning: React.FC = () => {
  const { orderId } = useAppSelector(selectCart);
  const { currentRegion } = useAppSelector(selectDelivery);

  const setOrderWarning = () => {
    if (currentRegion === 'Самовывоз') {
      return (
        <p>
          <img src={ordered} alt="Внимание" />
          {`Ваш заказ №${orderId} оформлен!`}
          <br />
          Мы оповестим вас о готовности через СМС.
        </p>
      );
    } else {
      return (
        <>
          <img src={deliveryBoy} alt="Внимание" />
          <p>
            {`Доставка заказа №${orderId}\n оформлена!`}
            <br />
            Скоро с вами свяжется курьер.
          </p>
        </>
      );
    }
  };

  return <div className={styles.ordered}>{setOrderWarning()}</div>;
};
