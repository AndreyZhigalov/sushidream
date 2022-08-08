import React from 'react';

import styles from './LoadingWarning.module.scss';

export const LoadingWarning: React.FC = () => {
  return (
    <div className={styles.loading_wrapper}>
      <div className={styles.lds_roller}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <h1>Загрузка</h1>
    </div>
  );
};
