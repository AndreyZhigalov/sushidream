import React, { useEffect, useRef } from 'react';

import { LogoContainer } from './Logo';
import { Navbar } from './Navbar';

import styles from './Header.module.scss';

export const Header: React.FC<{ setRef: (node: HTMLElement) => void }> = ({ setRef }) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
   ref.current && setRef(ref.current);
  }, [setRef, ref]);

  return (
    <header ref={ref} className={styles.header}>
      <LogoContainer />
      <Navbar />
    </header>
  );
};
