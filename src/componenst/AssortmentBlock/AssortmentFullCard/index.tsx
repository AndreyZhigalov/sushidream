import { useCallback, useState } from 'react';
import qs from 'qs';
import { useLocation, useNavigate } from 'react-router-dom';
import { setSpecials } from '../../../utils/setSpecials';
import CloseButton from '../../CloseButton';
import { FetchStatus } from '../../../models';
import { AssortmentItem, useAssortmentGetters } from '../../../redux/slices/assortment';
import { localPrice } from '../../../utils/localPrice';
import { useCartActions } from '../../../redux/slices/cart';
import { useFiltersGetters } from '../../../redux/slices/filters';
import classNames from 'classnames';

import styles from './AssortmentFullCard.module.scss';
import { ASSORTMENT_BACKGROUND_IMAGE } from '../../../constants/assortmentBackgroundImage';

type AssortmentFullCardProps = {
  isOpen: boolean;
};

export const AssortmentFullCard: React.FC<AssortmentFullCardProps> = ({ isOpen }) => {
  const { addToCart } = useCartActions();
  const { searchedItem, specials, status } = useAssortmentGetters();
  const { currentCategory, currentSortType } = useFiltersGetters();
  const [additionalInfo, setAdditionalInfo] = useState(searchedItem?.contents);
  const navigate = useNavigate();
  const { pathname, search } = useLocation();

  const previousSearch = qs.stringify({
    category: currentCategory.value,
    sortBy: currentSortType.value,
  });

  const onClickAdd = useCallback((obj: AssortmentItem) => {
    if (pathname.includes('cart')) {
      addToCart(obj);
      navigate(pathname);
    } else {
      addToCart(obj);
      navigate(`?${previousSearch}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickClose = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    return pathname.includes('cart') ? navigate(pathname) : navigate(`?${previousSearch}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClickClose}
      className={classNames(styles.overlay, {
        [styles.show]: status === FetchStatus.SUCCESS && search.includes('item='),
      })}>
      <div className={styles.card}>
        <CloseButton onPointerDown={onClickClose} className={styles.close_button} />
        <img
          src={searchedItem?.dishPhoto}
          alt={searchedItem?.title}
          style={{ backgroundImage: `URL(${ASSORTMENT_BACKGROUND_IMAGE})` }}
          loading="lazy"
          decoding="async"
          className={styles.card_image}
        />
        <div className={styles.description_block}>
          <h3 className={styles.description_block_title}>{searchedItem?.title}</h3>
          <div className={styles.add_block}>
            <div className={styles.item}>
              <p className={styles.item_text}>КОЛ-ВО: {searchedItem?.portion}</p>
              <span className={styles.item_value}>
                {searchedItem?.price && localPrice(searchedItem?.price)}
              </span>
            </div>

            <div
              className={classNames(styles.specials, {
                [styles.hide]: searchedItem?.specifics[0],
              })}>
              {setSpecials(searchedItem, specials)}
            </div>

            <button
              onClick={() => searchedItem && onClickAdd(searchedItem)}
              className={styles.add_button}>
              ДОБАВИТЬ В КОРЗИНУ
            </button>
          </div>
          <p className={styles.description}>{searchedItem?.description}</p>
          <button
            className={styles.info_button}
            onClick={() => searchedItem?.contents && setAdditionalInfo(searchedItem.contents)}>
            Состав
          </button>
          <button
            className={styles.info_button}
            onClick={() => searchedItem?.allergens && setAdditionalInfo(searchedItem?.allergens)}>
            Аллергены
          </button>
          <p className={styles.description}>{additionalInfo}</p>
        </div>
      </div>
    </div>
  );
};
