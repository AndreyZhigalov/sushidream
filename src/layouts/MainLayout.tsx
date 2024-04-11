import React, { ComponentPropsWithRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { Outlet } from 'react-router-dom';

import { Header, PagesNavigation, AssortmentFullCard } from '../componenst';
import Alert from '../componenst/ModalWindows/Alert';
import Confirm from '../componenst/ModalWindows/Confirm';
import GetPhone from '../componenst/ModalWindows/GetPhone';

import styles from '../scss/index.module.scss';
import { Modal } from '../componenst/Modal';

export type OutletContextType = {
  isHeaderInView: boolean;
};
type LayoutProps = ComponentPropsWithRef<'div'>;

const MainLayout: React.FC = ({ children, ...props }: LayoutProps) => {
  const { ref: inViewRef, inView } = useInView();

  const setRef = (node: HTMLElement) => {
    inViewRef(node);
  };

  return (
    <div className={styles.wrapper}>
      <AssortmentFullCard />
      <GetPhone />
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
