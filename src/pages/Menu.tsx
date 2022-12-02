import React from 'react';
import { useAppSelector } from '../Hooks/hooks';
import useScreenSize from '../Hooks/useScreenSize';

import { AccortmentBlock, Navigation, Check, Sort, DeliveryRegion } from '../componenst';

import { selectFilters } from '../redux/slices/filtersSlice';
import { selectAssortment, Status } from '../redux/slices/assortmentSlice';

import bannerLoader from '../assets/banner_loader.webp';

import styles from '../scss/index.module.scss';

const Menu: React.FC = () => {
  const screenSize = useScreenSize();
  const { currentCategory, categories } = useAppSelector(selectFilters);
  const { banners, status } = useAppSelector(selectAssortment);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const setBanner = () => {
    const banner = banners[categories.indexOf(currentCategory)];
    if (status === Status.LOADING) {
      return bannerLoader;
    } else {
      if (screenSize.width) {
        if (screenSize.width > 820) {
          return banner['1600'] ? banner['1600'] : bannerLoader;
        } else if (screenSize.width > 420) {
          return banner['820'] ? banner['820'] : bannerLoader;
        } else if (screenSize.width <= 420) {
          return banner['420'] ? banner['420'] : bannerLoader;
        }
      }
    }
  };

  return (
    <>
      <div className={styles.banner_wrapper}>
        {status !== 'error' && <img className={styles.menu_banner} src={setBanner()} alt="banner" />}
      </div>
      <div className={styles.menu_wrapper}>
        <Navigation navRange={[0, -2]} />
        <Sort />
        <AccortmentBlock />
        {screenSize.width ? screenSize.width > 820 && <DeliveryRegion /> : false}
        {screenSize.width ? screenSize.width > 820 && <Check /> : false}
      </div>
    </>
  );
};

export default Menu;
