import React, { ComponentPropsWithRef } from 'react';

import styles from './BigButton.module.scss';
import classNames from 'classnames';

type BigButtonType = ComponentPropsWithRef<'button'> & {
  isDisabled?: boolean;
  isLoading?: boolean;
};

export const BigButton: React.FC<BigButtonType> = ({
  onClick,
  className,
  isDisabled,
  isLoading,
  children,
  ...props
}) => {
  return (
    <button
      disabled={!!isDisabled}
      className={classNames(styles.button, {
        [className ?? '']: !!className,
        [styles.shining]: !!isLoading,
      })}
      onClick={(e) => !isLoading && onClick?.(e)}
      {...props}>
      {children}
    </button>
  );
};
