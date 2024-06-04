import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../../assets/logo-primary.svg?react';

import styles from './Logo.module.scss';

export const LogoContainer: React.FC = () => {
  return (
    <div className={styles.container}>
      <Link to="./" className={styles.link}>
        <Logo className={styles.logo} />
        <h1 className={styles.company_name}>
          SUSH<span className={styles.hightlight}>i</span>DREAM
        </h1>
      </Link>
    </div>
  );
};
