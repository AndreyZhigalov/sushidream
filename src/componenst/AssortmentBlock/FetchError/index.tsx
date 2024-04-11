import React from 'react';

import SadSushi from '../../../assets/SadSushi.svg';

import styles from './FetchError.module.scss';

export const FetchError: React.FC = () => {
  return (
    <div className={styles.fetch_block}>
      <img src={SadSushi} alt="Грустрое суши" />
      <h2>
        Прости, я потерялся и не смог прийти.
        <br /> Попробуй попозже ❤
      </h2>
    </div>
  );
};
