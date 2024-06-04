import { ComponentPropsWithRef } from 'react';

import closeIcon from '../../assets/icons/close.svg';
import classNames from 'classnames';

import styles from './CloseButton.module.scss';

const CloseButton = ({ className, onClick, ...props }: ComponentPropsWithRef<'img'>) => {
  return (
    <img
      src={closeIcon}
      className={classNames(styles.close_button, className)}
      onClick={onClick}
      {...props}
    />
  );
};

export default CloseButton;
