import React from 'react';

import styles from './BigButton.module.scss';

type BigButtonType = {
  text: string;
  anyFunc?: () => any;
  isFormValid?: boolean;
};

export const BigButton: React.FC<BigButtonType> = ({ text, anyFunc, isFormValid }) => {
  return (
    <button className={styles.button} type={'button'} onClick={anyFunc}>
      {text}
    </button>
  );
};
