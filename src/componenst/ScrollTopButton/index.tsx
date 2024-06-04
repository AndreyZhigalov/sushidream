import React, { ComponentProps } from 'react';

import arrow from '../../assets/icons/ArrowHead.svg';

import styles from './ScrollTopButton.module.scss';
import classNames from 'classnames';

const ScrollTopButton: React.FC<ComponentProps<'button'> & { isShown: boolean }> = ({
  isShown,
  ...props
}) => {
  return (
    <button
      className={classNames(styles.button, { [styles.show]: isShown })}
      onClick={() => window.scrollTo(0, 0)}
      {...props}>
      <img className={styles.icon} src={arrow} alt="К началу страницы" />
    </button>
  );
};

export default ScrollTopButton;
