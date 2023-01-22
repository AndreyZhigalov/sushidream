import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../Hooks/hooks';
import { clearCart, removeFromCart } from '../../../redux/slices/cartSlice';
import { closeAlert, modalSelector } from '../../../redux/slices/modalWindowSlice';
import { BigButton } from '../../BigButton';

import styles from '../ModalWindow.module.scss';

const Confirm = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { confirmMessage, removeID, type } = useAppSelector(modalSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    confirmMessage && setShowModal(true);
  }, [confirmMessage]);

  const acceptModal = () => {
    setShowModal(false);

    switch (type) {
      case 'clear':
        dispatch(clearCart());
        break;
      case 'remove':
        if (removeID) dispatch(removeFromCart(removeID));
        break;
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => dispatch(closeAlert()), 500);
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
