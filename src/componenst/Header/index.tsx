import React, { useEffect, useRef } from 'react';

import { LogoContainer } from './Logo';
import { Navbar } from './Navbar';

import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

export const Header: React.FC<{ setRef: (node: HTMLElement) => void }> = ({ setRef }) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    ref.current && setRef(ref.current);
  }, [setRef, ref]);

  return (
    <header ref={ref} className={styles.header}>
      <Link to={`${ROUTES.base}${ROUTES.main}`}>
        <LogoContainer />
      </Link>
      <Navbar />
    </header>
  );
};
