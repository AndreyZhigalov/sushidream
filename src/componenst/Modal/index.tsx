import { ComponentPropsWithRef, ReactNode } from 'react';
import CloseButton from '../CloseButton';

import styles from './Modal.module.scss';

type ModalPropsType = ComponentPropsWithRef<'dialog'> & {
  header?: string | ReactNode;
  open: boolean;
  onClose?: () => unknown;
};

export const Modal = ({ children, open, header, onClose, ...props }: ModalPropsType) => {
  if (!open) return null;

  return (
    <div
      className={styles.overlay}
      onClick={(e) => {
        if (e.currentTarget === e.target) onClose?.();
      }}>
      <dialog className={styles.modal} {...props} open={open}>
        <header className={styles.header}>
          <span>{header}</span>
          <CloseButton onClick={() => onClose?.()} />
        </header>
        <div className={styles.wrapper}>{children}</div>
      </dialog>
    </div>
  );
};
