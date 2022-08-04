import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../Hooks/hooks';
import { AssortmentItem, selectAssortment } from '../../../redux/slices/assortmentSlice';
import { addToCart } from '../../../redux/slices/cartSlice';
import { selectFilters } from '../../../redux/slices/filtersSlice';
import closeIcon from '../../../assets/icons/close.svg';

import styles from './AssortmentFullCard.module.scss';
import qs from 'qs';

export const AssortmentFullCard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { searchedItem, specials } = useAppSelector(selectAssortment);
  const { currentCategory, currentSortType } = useAppSelector(selectFilters);
  const [additionalInfo, setAdditionalInfo] = React.useState(searchedItem?.contents);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const item = searchedItem;

  const setSpecials = () => {
    if (item?.specifics[0]) {
      return specials.map((icon: string) => {
        return item?.specifics.find((link: string) =>
          icon.toLowerCase().includes(link.toLowerCase()),
        ) ? (
          <img key={icon} src={icon} alt="Особенность" />
        ) : (
          false
        );
      });
    }
  };

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

  return (
    <div className={styles.overlay}>
      <img src={closeIcon} alt="close" onClick={onClickClose} />
      <div className={styles.card}>
        <img src={item?.dishPhoto} alt="" />
        <div className={styles.descriptionBlock}>
          <h3>{item?.title}</h3>
          <div className={styles.addBlock}>
            <div>
              <p>КОЛ-ВО: {item?.portion}</p>
              <span>{item?.price}&#x20bd;</span>
            </div>
            {item?.specifics[0] && <div className={styles.specials}>{setSpecials()}</div>}
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
