import React from 'react';

import Logo from '../../../assets/logo-primary.svg?react';

import styles from './Logo.module.scss';

export const LogoContainer: React.FC = () => {
  return (
    <div className={styles.container}>
      <Logo className={styles.logo} />
      <h1 className={styles.company_name}>
        SUSH<span className={styles.hightlight}>i</span>DREAM
      </h1>
    </div>
  );
};
