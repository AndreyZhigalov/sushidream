import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../Hooks/hooks';
import { AssortmentItem, selectAssortment } from '../../../redux/slices/assortmentSlice';
import { addToCart } from '../../../redux/slices/cartSlice';
import { selectFilters } from '../../../redux/slices/filtersSlice';
import closeIcon from '../../../assets/icons/close.svg';

import styles from './AssortmentFullCard.module.scss';
import qs from 'qs';
import { setSpecials } from '../../../utils/setSpecials';

export const AssortmentFullCard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { searchedItem, specials } = useAppSelector(selectAssortment);
  const { currentCategory, currentSortType } = useAppSelector(selectFilters);
  const [additionalInfo, setAdditionalInfo] = React.useState(searchedItem?.contents);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const item = searchedItem;
  const overlayRef = React.useRef<HTMLDivElement>(null);

  const previousSearch = qs.stringify({
    category: currentCategory.engTitle,
    sortBy: currentSortType.engTitle,
  });

  const onClickAdd = (obj: AssortmentItem) => {
    if (pathname.includes('cart')) {
      dispatch(addToCart(obj));
      navigate(pathname);
    } else {
      dispatch(addToCart(obj));
      navigate(`?${previousSearch}`);
    }
  };

  const onClickClose = () => {
    return pathname.includes('cart') ? navigate(pathname) : navigate(`?${previousSearch}`);
  };

  const switchInfo = (text: string) => {
    setAdditionalInfo(text);
  };

  React.useEffect(() => {
    const overlayHandler = (event: MouseEvent) => {
      if (overlayRef.current === event.target) {
        onClickClose();
      }
    };
    document.body.addEventListener('click', overlayHandler);
    return () => document.body.removeEventListener('click', overlayHandler);
  }, []);

  return (
    <div ref={overlayRef} className={styles.overlay}>
      <div className={styles.card}>
        <img src={closeIcon} className={styles.closeButton} onClick={onClickClose} />
        <img src={item?.dishPhoto} alt={item?.title} />
        <div className={styles.descriptionBlock}>
          <h3>{item?.title}</h3>
          <div className={styles.addBlock}>
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
            className={styles.infoButton}
            onClick={() => (item?.contents ? switchInfo(item.contents) : false)}>
            Состав
          </button>
          <button
            className={styles.infoButton}
            onClick={() => (item?.allergens ? switchInfo(item?.allergens) : false)}>
            Аллергены
          </button>
          <p className={styles.description}>{additionalInfo}</p>
        </div>
      </div>
    </div>
  );
};
