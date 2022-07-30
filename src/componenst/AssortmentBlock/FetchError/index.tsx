import React from 'react';

import fetchError from '../../../assets/sushi.svg';

import styles from './FetchError.module.scss';

export const FetchError: React.FC = () => {
  return (
    <div className={styles.fetchBlock}>
      <img src={fetchError} alt="Грустрое суши" />
      <h2>
        Прости, я потерялся и не смог прийти.
        <br /> Попробуй попозже ❤
      </h2>
    </div>
  );
};
