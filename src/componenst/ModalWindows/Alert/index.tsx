import { useEffect, useState } from 'react';

import { BigButton } from '../../BigButton';

import styles from '../ModalWindow.module.scss';
import { useAppStore } from '../../../redux/store';

const Alert = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { actions: { closeAlert }, getters: { alertMessage } } = useAppStore().modalStore

  useEffect(() => {
    alertMessage && setShowModal(true);
  }, [alertMessage]);

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => closeAlert(), 500);
  };

  return (
    <div className={`${styles.overlay} ${showModal ? styles.showModal : ''}`}>
      <div className={styles.modal_window}>
        <h2 className={styles.message}>{alertMessage}</h2>
        <BigButton text="OK" anyFunc={closeModal} />
      </div>
    </div>
  );
};

export default Alert;
