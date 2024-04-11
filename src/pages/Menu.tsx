import useScreenSize from '../Hooks/useScreenSize';
import { useOutletContext } from 'react-router-dom';

import { AccortmentBlock, CategoryList, Check, Sort, DeliveryRegion } from '../componenst';
import ScrollTopButton from '../componenst/ScrollTopButton';
import { OutletContextType } from '../layouts/MainLayout';

import bannerLoader from '../assets/banner_loader.webp';

import styles from '../scss/index.module.scss';
import { FetchStatus } from '../models';
import { useAppStore } from '../redux/store';
import { useEffect } from 'react';

const Menu: React.FC = () => {
  const screenSize = useScreenSize();
  const { assortmentStore, filtersStore } = useAppStore();
  const { currentCategory } = filtersStore.getters;
  const { banners, status } = assortmentStore.getters;
  const { isHeaderInView } = useOutletContext<OutletContextType>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const setBanner = () => {
    const banner = banners[currentCategory.value];
    if (status === FetchStatus.LOADING) {
      return bannerLoader;
    } else {
      if (screenSize.width) {
        if (screenSize.width > 1024) {
          return banner?.['1600'] ? banner?.['1600'] : bannerLoader;
        } else if (screenSize.width > 420) {
          return banner?.['820'] ? banner?.['820'] : bannerLoader;
        } else if (screenSize.width <= 420) {
          return banner?.['420'] ? banner?.['420'] : bannerLoader;
        }
      }
    }
  };

  return (
    <>
      <div className={styles.banner_wrapper}>
        {status !== FetchStatus.ERROR && (
          <img
            className={styles.menu_banner}
            src={setBanner()}
            alt="banner"
            loading="lazy"
            decoding="async"
          />
        )}
      </div>
      <div className={styles.menu_wrapper}>
        <CategoryList navRange={[0, -2]} isFixed={!isHeaderInView} />
        <Sort />
        <AccortmentBlock />
        <ScrollTopButton isShown={!isHeaderInView} />
        {screenSize.width > 1024 && (
          <div className={`${styles.check_wrapper} ${!isHeaderInView ? styles.fixed : ''}`}>
            <DeliveryRegion />
            <Check />
          </div>
        )}
      </div>
    </>
  );
};

export default Menu;
