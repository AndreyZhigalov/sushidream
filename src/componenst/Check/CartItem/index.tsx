import { FetchStatus } from '../../../models';
import { useAppStore } from '../../../redux/store';
import { AssortmentItem } from '../../../redux/slices/assortment';

import styles from './CartItem.module.scss';
import { useState } from 'react';
import { Modal } from '../../Modal';
import { BigButton } from '../../BigButton';
import { localPrice } from '../../../utils/localPrice';
import { ASSORTMENT_BACKGROUND_IMAGE } from '../../../constants/assortmentBackgroundImage';

export const CartItem: React.FC<{ item: AssortmentItem }> = ({ item }) => {
  const { cartStore, orderStore } = useAppStore();
  const [showModal, setShowModal] = useState<boolean>(false);

  const { removeFromCart, addToCart } = cartStore.actions;
  const { setOrderStatus } = orderStore.actions;

  const onRemoveClick = () => {
    item.count > 1 ? removeFromCart(item.id) : setShowModal(true);
  };
  const onAddClick = () => {
    addToCart(item);
    setOrderStatus(FetchStatus.WAITING);
  };

  return (
    <>
      <Modal open={showModal} onClose={() => setShowModal(false)} style={{ maxWidth: 500 }}>
        <p>{`Удалить ${item.title} из корзины?`}</p>
        <div style={{ display: 'flex', gap: '20px' }}>
          <BigButton children="OK" onClick={() => removeFromCart(item.id)} />
          <BigButton children="Отмена" onClick={() => setShowModal(false)} />
        </div>
      </Modal>
      <div className={styles.item}>
        <img
          className={styles.cover}
          src={item.dishPhoto}
          alt="товар"
          style={{ backgroundImage: `URL(${ASSORTMENT_BACKGROUND_IMAGE})` }}
          width={200}
          height={200}
          loading="lazy"
          decoding="async"
        />
        <p className={styles.description}>
          {item.count} x {item.title}
        </p>
        <span className={styles.price}>{localPrice(item.price * item.count)}</span>
        <div className={styles.count}>
          <button className={styles.button} onClick={onRemoveClick}>
            -
          </button>
          <span className={styles.button_text}>{item.count}</span>
          <button className={styles.button} onClick={onAddClick}>
            +
          </button>
        </div>
      </div>
    </>
  );
};
