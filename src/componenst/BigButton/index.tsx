import React, { ComponentPropsWithRef } from 'react';

import styles from './BigButton.module.scss';

type BigButtonType = ComponentPropsWithRef<'button'> & {
  text: string;
  isFormValid?: boolean;
};

export const BigButton: React.FC<BigButtonType> = ({
  text,
  onClick,
  className,
  isFormValid,
  ...props
}) => {
  return (
    <button
      className={`${styles.button} ${className ? className : ''}`}
      onClick={onClick}
      {...props}>
      {text}
    </button>
  );
};
