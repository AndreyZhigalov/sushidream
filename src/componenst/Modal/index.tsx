import { ComponentPropsWithRef, ReactNode } from 'react';
import CloseButton from '../CloseButton';

import styles from './Modal.module.scss';
import classNames from 'classnames';

type ModalPropsType = ComponentPropsWithRef<'dialog'> & {
  header?: string | ReactNode;
  open: boolean;
  onClose?: () => unknown;
};

export const Modal = ({ children, open, header, onClose, className, ...props }: ModalPropsType) => {
  return (
    <div
      className={classNames(styles.overlay, { [styles.show]: open })}
      onClick={(e) => {
        if (e.currentTarget === e.target) onClose?.();
      }}>
      <div className={classNames(styles.background, { [styles.show]: open })}></div>
      <dialog
        className={classNames(styles.modal, { [styles.showModal]: open }, className)}
        {...props}
        open={true}>
        <header className={styles.header}>
          <span>{header}</span>
          <CloseButton onClick={() => onClose?.()} />
        </header>
        <div className={styles.wrapper}>{children}</div>
      </dialog>
    </div>
  );
};
