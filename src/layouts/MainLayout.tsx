import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { Header, PagesNavigation, AssortmentFullCard } from '../componenst';

import { useAppSelector } from '../Hooks/hooks';
import { selectAssortment, Status } from '../redux/slices/assortmentSlice';

import styles from '../scss/index.module.scss';

const MainLayout: React.FC = () => {
  const { status } = useAppSelector(selectAssortment);
  const { search } = useLocation();

  return (
    <div className={styles.wrapper}>
      {status === Status.SUCCESS && search.includes('item=') && <AssortmentFullCard />}
      <PagesNavigation />
      <Header />
      <main className={styles.main_container}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
