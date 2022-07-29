import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../../assets/logo-primary.svg';

import styles from './Logo.module.scss';

export const LogoContainer: React.FC = () => {
  return (
    <div className={styles.logoContainer}>
      <Link to="./">
        <img src={logo} alt="Логотип" className="logo" />
        <h1 className={styles.companyName}>
          SUSH<span>i</span>DREAM
        </h1>
      </Link>
    </div>
  );
};
