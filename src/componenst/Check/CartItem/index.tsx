import { FetchStatus } from '../../../models';
import { useAppStore } from '../../../redux/store';
import { AssortmentItem } from '../../../redux/slices/assortment';

import styles from './CartItem.module.scss';
import { useState } from 'react';
import { Modal } from '../../Modal';
import { BigButton } from '../../BigButton';

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
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <p>{`Удалить ${item.title} из корзины?`}</p>
        <div style={{ display: 'flex', gap: '20px' }}>
          <BigButton text="OK" onClick={() => removeFromCart(item.id)} />
          <BigButton text="Отмена" onClick={() => setShowModal(false)} />
        </div>
      </Modal>
      <div className={styles.cart_item}>
        <img
          src={item.dishPhoto}
          alt="товар"
          width={200}
          height={200}
          loading="lazy"
          decoding="async"
        />
        <p>
          {item.count} x {item.title}
        </p>
        <span>{item.price * item.count}&#x20bd;</span>
        <div className={styles.item_count}>
          <button onClick={onRemoveClick}>-</button>
          <span>{item.count}</span>
          <button onClick={onAddClick}>+</button>
        </div>
      </div>
    </>
  );
};
