import classNames from 'classnames';
import { useCartGetters } from '../../../redux/slices/cart';
import { useDeliveryGetters } from '../../../redux/slices/delivery';
import { localPrice } from '../../../utils/localPrice';

import styles from './TotalCost.module.scss';

export const TotalCost: React.FC = () => {
  const { currentCost: deliveryCost } = useDeliveryGetters();
  const { totalPrice, discount } = useCartGetters();
  const finalDiscount = (10e10 * (((totalPrice + deliveryCost) / 100) * discount)) / 10e10;

  const total =
    discount > 0 && totalPrice > 0
      ? totalPrice + deliveryCost - finalDiscount
      : totalPrice + deliveryCost;
  const fullPrice = totalPrice + deliveryCost;
  return (
    <div className={styles.total}>
      <p className={styles.row}>
        Доставка <span>{localPrice(deliveryCost)}</span>
      </p>
      <p className={classNames(styles.row, { [styles.hide]: !(discount > 0 && totalPrice > 0) })}>
        Скидка <span>{localPrice(finalDiscount)}</span>
      </p>
      <p className={styles.row}>
        ИТОГО
        <span className={styles.price}>
          <span className={styles.fullPrice}>{localPrice(fullPrice)}</span>
          <span>{localPrice(total)}</span>
        </span>
      </p>
    </div>
  );
};
