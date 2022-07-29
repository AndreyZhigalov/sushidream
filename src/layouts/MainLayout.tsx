import { Outlet } from 'react-router-dom';

import { Header } from '../componenst/Header';
import { PagesNavigation } from '../componenst/PagesNavigation';

import styles from '../scss/index.module.scss';

const MainLayout: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <PagesNavigation />
      <Header />
      <main className={styles.mainContainer}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
