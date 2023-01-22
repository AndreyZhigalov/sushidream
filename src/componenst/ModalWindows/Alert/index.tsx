import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../Hooks/hooks';
import { closeAlert, modalSelector } from '../../../redux/slices/modalWindowSlice';
import { BigButton } from '../../BigButton';

import styles from '../ModalWindow.module.scss';

const Alert = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { alertMessage } = useAppSelector(modalSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    alertMessage && setShowModal(true);
  }, [alertMessage]);

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => dispatch(closeAlert()), 500);
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
