import React from 'react';

import SadSushi from '../../../assets/SadSushi.svg?react';

import styles from './FetchError.module.scss';

export const FetchError: React.FC = () => {
  return (
    <div className={styles.container}>
      <SadSushi className={styles.icon} />
      <h2 className={styles.title}>
        Прости, я потерялся и не смог прийти.
        <br /> Попробуй попозже ❤
      </h2>
    </div>
  );
};
