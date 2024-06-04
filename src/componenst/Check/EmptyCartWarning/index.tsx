import React from 'react';
import warning from '../../../assets/icons/warning.svg';
import styles from './EmptyCartWarning.module.scss';

export const EmptyCartWarning: React.FC = () => {
  return (
    <div className={styles.empty}>
      <img className={styles.image} src={warning} alt="Внимание" />
      <p className={styles.text}>
        Вы ничего не выбрали.
        <br />
        Добавьте что-то в ваш чек.
      </p>
    </div>
  );
};
