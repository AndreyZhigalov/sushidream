import React from 'react';
import { useAppSelector } from '../../../Hooks/hooks';
import { selectCart } from '../../../redux/slices/cartSlice';
import { selectDelivery } from '../../../redux/slices/deliverySlice';

import styles from './TotalCost.module.scss';

export const TotalCost: React.FC = () => {
  const { currentCost } = useAppSelector(selectDelivery);
  const { totalPrice, discount } = useAppSelector(selectCart);

  return (
    <div className={styles.total}>
      <p>
        Доставка <span>{currentCost}&#x20bd;</span>
      </p>
      {discount > 0 && totalPrice > 0 && (
        <p>
          Скидка <span>{((totalPrice + currentCost) / 100) * 30}&#x20bd;</span>
        </p>
      )}
      <p>
        ИТОГО{' '}
        <span>
          {discount > 0 && totalPrice > 0
            ? totalPrice + currentCost - ((totalPrice + currentCost) / 100) * 30
            : totalPrice + currentCost}
          &#x20bd;
        </span>
      </p>
    </div>
  );
};
