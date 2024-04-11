import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import cart from '../../../assets/icons/cart.svg';
import menu from '../../../assets/icons/menu.svg';
import user from '../../../assets/icons/user.svg';

import styles from './Navbar.module.scss';

import { FetchStatus } from '../../../models';
import { useAppStore } from '../../../redux/store';


export const Navbar: React.FC = () => {
  const { cartStore, navbarStore, assortmentStore } = useAppStore()
  const { actions: { fetchCart }, getters: { count } } = cartStore
  const { status } = assortmentStore.getters
  const { openNavbar } = navbarStore.actions
  const [showSubmenu, setShowSubmenu] = useState(false);

  useEffect(() => {
    status === FetchStatus.LOADING && fetchCart();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <div className={styles.header_links}>
      <Link to="cart">
        <img src={cart} alt="корзина" />
        <span>{count > 0 ? count : ''}</span>
      </Link>
      <div className={styles.submenu_container}>
        <img src={user} alt="профиль" onClick={() => setShowSubmenu((value) => !value)} />
        <div className={styles.submenu} data-is-shown={showSubmenu}>
          <Link to="profile" onClick={() => setShowSubmenu(() => false)}>
            Профиль
          </Link>
          <Link to="notifications" onClick={() => setShowSubmenu(() => false)}>
            Уведомления
          </Link>
        </div>
      </div>
      <img src={menu} onClick={() => openNavbar(true)} alt="меню" />
    </div>
  );
};
