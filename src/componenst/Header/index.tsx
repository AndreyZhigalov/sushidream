import React from 'react';

import { LogoContainer } from './Logo';
import { Navbar } from './Navbar';

import styles from './Header.module.scss';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <LogoContainer />
      <Navbar />
    </header>
  );
};
