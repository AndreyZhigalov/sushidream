import React from 'react';
import { useAppSelector } from '../../../Hooks/hooks';

import styles from './TotalCost.module.scss';

export const TotalCost: React.FC = () => {
  const deliveryCost = useAppSelector((state) => state.delivery.currentCost);
  const { totalPrice } = useAppSelector((state) => state.cart);
  return (
    <div className={styles.total}>
      <p>
        доставка <span>{deliveryCost}&#x20bd;</span>
      </p>
      <p>
        ИТОГО <span>{totalPrice + deliveryCost}&#x20bd;</span>
      </p>
    </div>
  );
};
