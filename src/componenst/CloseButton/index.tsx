import { ComponentPropsWithRef } from 'react';

import closeIcon from '../../assets/icons/close.svg';

import styles from './CloseButton.module.scss';

const CloseButton = ({ className, onClick, ...props }: ComponentPropsWithRef<'img'>) => {
  return (
    <img
      src={closeIcon}
      className={`${styles.close_button} ${className ? className : ''}`}
      onClick={onClick}
      {...props}
    />
  );
};

export default CloseButton;
