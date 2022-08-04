import { Outlet, useLocation } from 'react-router-dom';
import { AssortmentFullCard } from '../componenst/AssortmentBlock/AssortmentFullCard';

import { Header } from '../componenst/Header';
import { PagesNavigation } from '../componenst/PagesNavigation';
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
      <main className={styles.mainContainer}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
