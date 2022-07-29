import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../Hooks/hooks';
import { Link } from 'react-router-dom';
import { openNavbar } from '../../../redux/slices/navbarSlice';

import cart from '../../../assets/icons/cart.svg';
import menu from '../../../assets/icons/menu.svg';
import user from '../../../assets/icons/user.svg';

import styles from './Navbar.module.scss';

export const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartItemCount = useAppSelector((state) => state.cart.count);
  return (
    <div className={styles.headerLinks}>
      <Link to="cart">
        <img src={cart} height={50} alt="корзина" />
        <span>{cartItemCount ? cartItemCount : ''}</span>
      </Link>
      <Link to="profile">
        <img src={user} height={35} alt="профиль" />
      </Link>
      <img src={menu} height={35} onClick={() => dispatch(openNavbar(true))} alt="меню" />
    </div>
  );
};
