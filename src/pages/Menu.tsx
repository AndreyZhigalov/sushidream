import {
  AccortmentBlock,
  CategoryList,
  Check,
  Sort,
  DeliveryRegion,
  AssortmentFullCard,
} from '../componenst';
import ScrollTopButton from '../componenst/ScrollTopButton';

import styles from '../scss/index.module.scss';
import { FetchStatus } from '../models';
import { useEffect } from 'react';
import { useNavbarGetters } from '../redux/slices/navbar';
import { useAssortmentGetters } from '../redux/slices/assortment';
import { useMainBanner } from '../utils/useMainBanner';
import classNames from 'classnames';

const Menu: React.FC = () => {
  const banners = useMainBanner();
  const { searchedItem, status } = useAssortmentGetters();
  const { inView } = useNavbarGetters();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <AssortmentFullCard isOpen={!!searchedItem} />
      <div className={styles.banner_wrapper}>
        <img
          className={styles.menu_banner}
          srcSet={banners.join(', ')}
          style={{ display: status === FetchStatus.ERROR ? 'none' : 'block' }}
          alt="banner"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className={styles.menu_wrapper}>
        <CategoryList navRange={[0, -2]} isFixed={!inView} />
        <Sort />
        <AccortmentBlock />
        <ScrollTopButton isShown={!inView} />
        <div className={classNames(styles.check_wrapper, { [styles.fixed]: inView })}>
          <DeliveryRegion />
          <Check />
        </div>
      </div>
    </>
  );
};

export default Menu;
