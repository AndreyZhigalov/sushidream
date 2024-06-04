import { memo, useEffect, useState } from 'react';
import TrashCan from '../../assets/icons/trash.svg?react';
import { TotalCost } from './TotalCost';
import { OrderButton } from './OrderButton';
import { FetchStatus } from '../../models';
import { useAppStore } from '../../redux/store';
import { CartItemsBlock } from './CartItemsBlock';

import styles from './Check.module.scss';
import { Modal } from '../Modal';
import { BigButton } from '../BigButton';
import classNames from 'classnames';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onAccept = () => {
    setShowModal(false);
    clearCart();
  };

  return (
    <>
      <Modal open={showModal} onClose={() => setShowModal(false)} style={{ maxWidth: 500 }}>
        <h2 className={styles.modal_title}>Отчистить корзину?</h2>
        <div className={styles.modal_content}>
          <BigButton children="Да" onClick={onAccept} />
          <BigButton children="Нет" onClick={() => setShowModal(false)} />
        </div>
      </Modal>
      <div className={styles.check}>
        <TrashCan
          onClick={() => setShowModal(true)}
          className={classNames(styles.trash, { [styles.hide]: !(count > 0) })}
        />
        <h2 className={styles.title}>ВАШ ЗАКАЗ</h2>
        <CartItemsBlock />
        <TotalCost />
        <OrderButton className={classNames({ [styles.hide]: !(count > 0 && currentRegion) })} />
      </div>
    </>
  );
});
