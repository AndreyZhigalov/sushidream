import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../../assets/logo-primary.svg';

import styles from './Logo.module.scss';

export const LogoContainer: React.FC = () => {
  return (
    <div className={styles.logo_container}>
      <Link to="./">
        <img src={logo} alt="Логотип" className="logo" />
        <h1 className={styles.company_name}>
          SUSH<span>i</span>DREAM
        </h1>
      </Link>
    </div>
  );
};
