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
  const { specials, assortment } = useAppSelector(selectAssortment);
  const { currentCategory, currentSortType } = useAppSelector(selectFilters);
  const { search } = useLocation();
  const navigate = useNavigate();
  const id = search.replace('?item=', '');

  const item = assortment[currentCategory.engTitle].find((item) => +item.id === +id);

  const previousSearch = qs.stringify({
    category: currentCategory.engTitle,
    sortBy: currentSortType.engTitle,
  });

  const setSpecials = () => {
    return specials.map((icon: string) => {
      return item?.specifics.find((link) => icon.toLowerCase().includes(link.toLowerCase())) ? (
        <img key={icon} src={icon} alt="Особенность" />
      ) : (
        false
      );
    });
  };

  const onClickAdd = (obj: AssortmentItem) => {
    dispatch(addToCart(obj));
    navigate(`?${previousSearch}`);
  };

  return (
    <div className={styles.overlay}>
      <img src={closeIcon} alt="close" onClick={() => navigate(`?${previousSearch}`)} />
      <div className={styles.card}>
        <img src={item?.dishPhoto} alt="" />
        <div className={styles.descriptionBlock}>
          <h3>{item?.title}</h3>
          <div className={styles.addBlock}>
            <div>
              <p>КОЛ-ВО: {item?.portion}</p>
              <span>{item?.price}&#x20bd;</span>
            </div>
            <div className={styles.specials}>{setSpecials()}</div>
            <button onClick={() => item && onClickAdd(item)} className={styles.add}>
              ДОБАВИТЬ В КОРЗИНУ
            </button>
          </div>
          <p className={styles.description}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla eligendi earum atque
            consequatur tenetur delectus deserunt soluta ipsa optio aliquam illo quos, impedit
            nostrum ducimus cum enim ipsum repudiandae asperiores incidunt odit alias ut qui! Enim
            alias praesentium harum nulla quis similique odit. Rerum, quae minus! Officia rerum
            corrupti tempore asperiores consequatur vitae quis doloremque, in facere exercitationem?
            Quaerat quasi suscipit cum dignissimos quis molestiae, repudiandae accusamus laudantium
            provident, aut magnam ex praesentium rerum non ratione, incidunt recusandae distinctio
            nobis maiores culpa iusto dolorum. Impedit voluptatibus soluta, eos reprehenderit,
            voluptates ducimus laborum, blanditiis porro pariatur praesentium quasi!
          </p>
          <button className={styles.infoButton}>Состав</button>
          <button className={styles.infoButton}>Аллергены</button>
          <p className={styles.description}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla eligendi earum atque
            consequatur tenetur delectus deserunt soluta ipsa optio aliquam illo quos, impedit
            nostrum ducimus cum enim ipsum repudiandae asperiores incidunt odit alias ut qui! Enim
            alias praesentium harum nulla quis similique odit.
          </p>
          {/* <p className={styles.description}>
            Quaerat quasi suscipit cum dignissimos quis molestiae, repudiandae accusamus laudantium
            provident, aut magnam ex praesentium rerum non ratione, incidunt recusandae distinctio
            nobis maiores culpa iusto dolorum. Impedit voluptatibus soluta, eos reprehenderit,
            voluptates ducimus laborum, blanditiis porro pariatur praesentium quasi!
          </p> */}
        </div>
      </div>
    </div>
  );
};
