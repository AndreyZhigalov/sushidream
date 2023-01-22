import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Outlet } from 'react-router-dom';

import { Header, PagesNavigation, AssortmentFullCard } from '../componenst';
import Alert from '../componenst/ModalWindows/Alert';
import Confirm from '../componenst/ModalWindows/Confirm';
import Terms from '../componenst/ModalWindows/Terms';

import styles from '../scss/index.module.scss';

export type OutletContextType = {
  isHeaderInView: boolean;
};

const MainLayout: React.FC = () => {
  const { ref: inViewRef, inView } = useInView();

  const setRef = (node: HTMLElement) => {
    inViewRef(node);
  };

  return (
    <div className={styles.wrapper}>
      <AssortmentFullCard />
      <Alert />
      <Confirm />
      <PagesNavigation />
      <Header setRef={setRef} />
      <main className={styles.main_container}>
        <Outlet context={{ isHeaderInView: inView } as OutletContextType} />
      </main>
    </div>
  );
};

export default MainLayout;
