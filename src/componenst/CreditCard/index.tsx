import React from 'react';

import styles from './CreditCard.module.scss';
import { UserState } from '../../redux/slices/user';

const CreditCard: React.FC<{ user: UserState }> = ({ user }) => {
  return (
    <figure className={styles.card_container}>
      <h3 className={styles.card_title}>sushidream</h3>
      <ul className={styles.card_number}>
        <li className={styles.card_number_part}>5436</li>
        <li className={styles.card_number_part}>2623</li>
        <li className={styles.card_number_part}>7754</li>
        <li className={styles.card_number_part}>1347</li>
      </ul>
      <div className={styles.card_data_wrapper}>
        <div className={styles.card_data}>
          <small className={styles.card_data_header}>Владелец</small>
          <p>
            <span className={styles.card_name}>{user.name}</span>{' '}
            <span className={styles.card_surname}>{user.lastName}</span>
          </p>
        </div>
        <div className={styles.card_data}>
          <small className={styles.card_data_header}>Срок</small>
          <p>
            <span className={styles.card_month}>09</span>/
            <span className={styles.card_year}>26</span>
          </p>
        </div>
      </div>
    </figure>
  );
};

export default CreditCard;
