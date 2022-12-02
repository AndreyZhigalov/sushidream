import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../Hooks/hooks';
import { Link } from 'react-router-dom';
import { openNavbar } from '../../../redux/slices/navbarSlice';
import { selectCart } from '../../../redux/slices/cartSlice';

import cart from '../../../assets/icons/cart.svg';
import menu from '../../../assets/icons/menu.svg';
import user from '../../../assets/icons/user.svg';

import styles from './Navbar.module.scss';

export const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { count } = useAppSelector(selectCart);
  return (
    <div className={styles.header_links}>
      <Link to="cart">
        <img src={cart} alt="корзина" />
        <span>{count > 0 ? count : ''}</span>
      </Link>
      <Link to="profile">
        <img src={user} alt="профиль" />
      </Link>
      <img src={menu} onClick={() => dispatch(openNavbar(true))} alt="меню" />
    </div>
  );
};
