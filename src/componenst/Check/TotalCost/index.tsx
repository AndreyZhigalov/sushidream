import styles from './TotalCost.module.scss';
import { useAppStore } from '../../../redux/store';

export const TotalCost: React.FC = () => {
  const { deliveryStore, cartStore } = useAppStore()
  const { currentCost } = deliveryStore.getters
  const { totalPrice, discount } = cartStore.getters
  const finalDiscount = (10e10 * (((totalPrice + currentCost) / 100) * 30)) / 10e10;

  return (
    <div className={styles.total}>
      <p>
        Доставка <span>{currentCost}&#x20bd;</span>
      </p>
      {discount > 0 && totalPrice > 0 && (
        <p>
          Скидка <span>{finalDiscount}&#x20bd;</span>
        </p>
      )}
      <p>
        ИТОГО{' '}
        <span>
          {discount > 0 && totalPrice > 0
            ? totalPrice + currentCost - finalDiscount
            : totalPrice + currentCost}
          &#x20bd;
        </span>
      </p>
    </div>
  );
};
