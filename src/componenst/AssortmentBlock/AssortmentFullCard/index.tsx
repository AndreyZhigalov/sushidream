import { useCallback, useEffect, useRef, useState } from 'react';
import qs from 'qs';
import { useLocation, useNavigate } from 'react-router-dom';
import { setSpecials } from '../../../utils/setSpecials';
import CloseButton from '../../CloseButton';
import { FetchStatus } from '../../../models';
import { useAppStore } from '../../../redux/store';
import { AssortmentItem } from '../../../redux/slices/assortment';

import styles from './AssortmentFullCard.module.scss';

export const AssortmentFullCard: React.FC = () => {
  const { cartStore, assortmentStore, filtersStore } = useAppStore();
  const { addToCart } = cartStore.actions;
  const { searchedItem, specials, status } = assortmentStore.getters;
  const { currentCategory, currentSortType } = filtersStore.getters;
  const [additionalInfo, setAdditionalInfo] = useState(searchedItem?.contents);
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const item = searchedItem;
  const overlayRef = useRef<HTMLDivElement>(null);

  const previousSearch = qs.stringify({
    category: currentCategory.value,
    sortBy: currentSortType.value,
  });

  const onClickAdd = (obj: AssortmentItem) => {
    if (pathname.includes('cart')) {
      addToCart(obj);
      navigate(pathname);
    } else {
      addToCart(obj);
      navigate(`?${previousSearch}`);
    }
  };

  const onClickClose = useCallback(() => {
    return pathname.includes('cart') ? navigate(pathname) : navigate(`?${previousSearch}`);
  }, [pathname, navigate, previousSearch]);

  const switchInfo = (text: string) => {
    setAdditionalInfo(text);
  };

  useEffect(() => {
    const overlayHandler = (event: MouseEvent) => {
      if (overlayRef.current === event.target) {
        onClickClose();
      }
    };
    document.body.addEventListener('click', overlayHandler);
    return () => document.body.removeEventListener('click', overlayHandler);
  }, [onClickClose]);

  return (
    <div
      ref={overlayRef}
      className={`${styles.overlay} ${
        status === FetchStatus.SUCCESS && search.includes('item=') ? styles.show : ''
      }`}>
      <div className={styles.card}>
        <CloseButton onClick={onClickClose} className={styles.close} />
        <img src={item?.dishPhoto} alt={item?.title} />
        <div className={styles.description_block}>
          <h3>{item?.title}</h3>
          <div className={styles.add_block}>
            <div>
              <p>КОЛ-ВО: {item?.portion}</p>
              <span>{item?.price}&#x20bd;</span>
            </div>
            {item?.specifics[0] && (
              <div className={styles.specials}>{setSpecials(item, specials)}</div>
            )}
            <button onClick={() => searchedItem && onClickAdd(searchedItem)} className={styles.add}>
              ДОБАВИТЬ В КОРЗИНУ
            </button>
          </div>
          <p className={styles.description}>{item?.description}</p>
          <button
            className={styles.info_button}
            onClick={() => (item?.contents ? switchInfo(item.contents) : false)}>
            Состав
          </button>
          <button
            className={styles.info_button}
            onClick={() => (item?.allergens ? switchInfo(item?.allergens) : false)}>
            Аллергены
          </button>
          <p className={styles.description}>{additionalInfo}</p>
        </div>
      </div>
    </div>
  );
};
