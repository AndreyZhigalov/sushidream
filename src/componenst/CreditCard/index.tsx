import React from 'react';

import styles from './CreditCard.module.scss';
import { UserState } from '../../redux/slices/user';

const CreditCard: React.FC<{ user: UserState }> = ({ user }) => {
  return (
    <figure className={styles.container}>
      <h3 className={styles.title}>sushidream</h3>
      <ul className={styles.number}>
        <li className={styles.number_part}>5436</li>
        <li className={styles.number_part}>2623</li>
        <li className={styles.number_part}>7754</li>
        <li className={styles.number_part}>1347</li>
      </ul>
      <div className={styles.wrapper}>
        <div className={styles.data}>
          <small className={styles.header}>Владелец</small>
          <p>
            <span className={styles.name}>{user.displayName}</span>{' '}
          </p>
        </div>
        <div className={styles.data}>
          <small className={styles.header}>Срок</small>
          <p>
            <span className={styles.month}>09</span>/<span className={styles.year}>26</span>
          </p>
        </div>
      </div>
    </figure>
  );
};

export default CreditCard;
