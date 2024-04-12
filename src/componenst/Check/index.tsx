import { memo, useEffect, useState } from 'react';
import trash from '../../assets/icons/trash.svg';
import { TotalCost } from './TotalCost';
import { OrderButton } from './OrderButton';
import { FetchStatus } from '../../models';
import { useAppStore } from '../../redux/store';
import { CartItemsBlock } from './CartItemsBlock';

import styles from './Check.module.scss';
import { Modal } from '../Modal';
import { BigButton } from '../BigButton';

export const Check: React.FC = memo(() => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { cartStore, deliveryStore } = useAppStore();
  const { count, cartStatus } = cartStore.getters;
  const { fetchCart, clearCart } = cartStore.actions;
  const { currentRegion } = deliveryStore.getters;
  const { fetchRegion, getAddresses } = deliveryStore.actions;

  useEffect(() => {
    if (cartStatus === FetchStatus.LOADING) {
      fetchCart();
      fetchRegion();
      getAddresses();
    }
  }, []);

  const onAccept = () => {
    setShowModal(false);
    clearCart();
  };

  return (
    <>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <h2>Отчистить корзину?</h2>
        <div style={{ display: 'flex', gap: '20px' }}>
          <BigButton text="Да" onClick={onAccept} />
          <BigButton text="Нет" onClick={() => setShowModal(false)} />
        </div>
      </Modal>
      <div className={styles.check}>
        {count > 0 && <img src={trash} alt="Clear cart" onClick={() => setShowModal(true)} />}
        <h2>ВАШ ЗАКАЗ</h2>
        <CartItemsBlock />
        <TotalCost />
        {count > 0 && currentRegion && <OrderButton />}
      </div>
    </>
  );
});
