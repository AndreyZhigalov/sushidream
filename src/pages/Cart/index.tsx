import React from 'react';
import { Check } from '../../componenst/Check';
import { DeliveryRegion } from '../../componenst/DeliveryRegion';
import { useAppDispatch, useAppSelector } from '../../Hooks/hooks';
import { AssortmentItem, selectAssortment } from '../../redux/slices/assortmentSlice';
import { addToCart } from '../../redux/slices/cartSlice';
import { selectFilters } from '../../redux/slices/filtersSlice';

import styles from './Cart.module.scss';

export const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector(selectFilters);
  const { assortment } = useAppSelector(selectAssortment);
  let additionals = [];
  for (let key in assortment) {
    key === 'accompaniment' && additionals.push(assortment[key]);
    key === 'dessert' && additionals.push(assortment[key]);
    key === 'drinkables' && additionals.push(assortment[key]);
  }

  return (
    <div className={styles.cart}>
      <div>
        <DeliveryRegion />
        <Check />
      </div>
      <ul className={styles.categories}>
        <p>ЖЕЛАЕТЕ ДОБАВИТЬ ЧТО-ТО ЕЩЁ?</p>
        {categories.slice(-3).map((category) => (
          <li key={category.engTitle}>{category.ruTitle.toUpperCase()}</li>
        ))}
        <li>{'ПРИБОРЫ'.toUpperCase()}</li>
        <li>{'СОУСЫ'.toUpperCase()}</li>
      </ul>
      <div className={styles.items}>
        <div>
          <img src="img/assort/additionals/gingembre.webp" alt="горчица" />
          <h4>ГОРЧИЦА</h4>
          <button className={styles.add} onClick={() => dispatch(addToCart({} as AssortmentItem))}>
            Добавить
          </button>
        </div>
        <div>
          <img src="img/assort/additionals/sticks.webp" alt="палочки" />
          <h4>ПАЛОЧКИ</h4>
          <button className={styles.add} onClick={() => dispatch(addToCart({} as AssortmentItem))}>
            Добавить
          </button>
        </div>
        <div>
          <img src="img/assort/additionals/wasabi.webp" alt="васаби" />
          <h4>ВАСАБИ</h4>
          <button className={styles.add} onClick={() => dispatch(addToCart({} as AssortmentItem))}>
            Добавить
          </button>
        </div>
      </div>
    </div>
  );
};
