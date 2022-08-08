import React from 'react';

import styles from './BigButton.module.scss';

type BigButtonType = {
  text: string;
  anyFunc?: () => any;
  disable?: boolean;
};

export const BigButton: React.FC<BigButtonType> = ({ text, anyFunc, disable }) => {
  return (
    <button className={styles.button} onClick={anyFunc} disabled={disable}>
      {text}
    </button>
  );
};
