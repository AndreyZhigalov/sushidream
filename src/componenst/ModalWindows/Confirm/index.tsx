import { useEffect, useState } from 'react';

import { BigButton } from '../../BigButton';

import styles from '../ModalWindow.module.scss';
import { useAppStore } from '../../../redux/store';

const Confirm = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { modalStore, cartStore } = useAppStore()
  const { confirmMessage, removeID, type } = modalStore.getters
  const { closeAlert } = modalStore.actions

  const { removeFromCart, clearCart } = cartStore.actions

  useEffect(() => {
    confirmMessage && setShowModal(true);
  }, [confirmMessage]);

  const acceptModal = () => {
    setShowModal(false);

    switch (type) {
      case 'clear':
        clearCart();
        break;
      case 'remove':
        if (removeID) removeFromCart(removeID);
        break;
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => closeAlert(), 500);
  };

  return (
    <div className={`${styles.overlay} ${showModal ? styles.showModal : ''}`}>
      <div className={styles.modal_window}>
        <h2 className={styles.message}>{confirmMessage}</h2>
        <div className={styles.buttons_container}>
          <BigButton text="OK" anyFunc={acceptModal} />
          <BigButton text="Отмена" anyFunc={closeModal} />
        </div>
      </div>
    </div>
  );
};

export default Confirm;
