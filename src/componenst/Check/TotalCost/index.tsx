import React from 'react';
import { useAppSelector } from '../../../Hooks/hooks';
import { selectCart } from '../../../redux/slices/cartSlice';
import { selectDelivery } from '../../../redux/slices/deliverySlice';

import styles from './TotalCost.module.scss';

export const TotalCost: React.FC = () => {
  const { currentCost } = useAppSelector(selectDelivery);
  const { totalPrice } = useAppSelector(selectCart);

  return (
    <div className={styles.total}>
      <p>
        доставка <span>{currentCost}&#x20bd;</span>
      </p>
      <p>
        ИТОГО <span>{totalPrice + currentCost}&#x20bd;</span>
      </p>
    </div>
  );
};
