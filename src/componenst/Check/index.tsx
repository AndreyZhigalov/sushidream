import { memo, useEffect } from 'react';
import trash from '../../assets/icons/trash.svg';
import { TotalCost } from './TotalCost';
import { OrderButton } from './OrderButton';
import { FetchStatus } from '../../models';
import { useAppStore } from '../../redux/store';
import { CartItemsBlock } from './CartItemsBlock';

import styles from './Check.module.scss';

export const Check: React.FC = memo(() => {
  const { cartStore, deliveryStore, modalStore } = useAppStore();
  const { count, cartStatus } = cartStore.getters;
  const { fetchCart } = cartStore.actions;
  const { currentRegion } = deliveryStore.getters;
  const { fetchRegion, getAddresses } = deliveryStore.actions;
  const { confirmAlert } = modalStore.actions;

  useEffect(() => {
    if (cartStatus === FetchStatus.LOADING) {
      fetchCart();
      fetchRegion();
      getAddresses();
    }
  }, []);

  return (
    <div className={styles.check}>
      {count > 0 && (
        <img
          src={trash}
          alt="Clear cart"
          onClick={() => confirmAlert({ message: 'Отчистить корзину?', type: 'clear' })}
        />
      )}
      <h2>ВАШ ЗАКАЗ</h2>
      <CartItemsBlock />
      <TotalCost />
      {count > 0 && currentRegion && <OrderButton />}
    </div>
  );
});
