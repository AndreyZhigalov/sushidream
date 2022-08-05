import React from 'react';

import { AccortmentBlock } from '../componenst/AssortmentBlock';
import { useAppSelector } from '../Hooks/hooks';
import { Navigation } from '../componenst/Navigation';
import { Check } from '../componenst/Check';
import { Sort } from '../componenst/Sort';
import { DeliveryRegion } from '../componenst/DeliveryRegion';
import { selectFilters } from '../redux/slices/filtersSlice';
import useScreenSize from '../Hooks/useScreenSize';
import { selectAssortment, Status } from '../redux/slices/assortmentSlice';
import bannerLoader from '../assets/banner_loader.webp';

import styles from '../scss/index.module.scss';

export const Menu: React.FC = () => {
  const screenSize = useScreenSize();
  const { currentCategory, categories } = useAppSelector(selectFilters);
  const { banners, status } = useAppSelector(selectAssortment);
  window.scrollTo(0, 0);

  const setBanner = () => {
    if (status === Status.LOADING) {
      return bannerLoader;
    } else {
      if (screenSize.width > 820) {
        console.log(banners[categories.indexOf(currentCategory)]['1600']);
        return banners[categories.indexOf(currentCategory)]['1600'];
      } else if (screenSize.width > 420) {
        return banners[categories.indexOf(currentCategory)]['820'];
      } else if (screenSize.width <= 420) {
        return banners[categories.indexOf(currentCategory)]['420'];
      }
    }
  };

  return (
    <>
      <div className={styles.bannerWrapper}>
        {status !== 'error' && <img className={styles.menuBanner} src={setBanner()} alt="banner" />}
      </div>
      <div className={styles.menuWrapper}>
        <Navigation navRange={[0, -2]} />
        <Sort />
        <AccortmentBlock />
        {screenSize.width > 820 && <DeliveryRegion />}
        {screenSize.width > 820 && <Check />}
      </div>
    </>
  );
};
