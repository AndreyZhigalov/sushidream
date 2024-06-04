import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import cart from '../../../assets/icons/cart.svg';
import menu from '../../../assets/icons/menu.svg';
import user from '../../../assets/icons/user.svg';

import styles from './Navbar.module.scss';

import { FetchStatus } from '../../../models';
import { useAppStore } from '../../../redux/store';
import classNames from 'classnames';

export const Navbar: React.FC = () => {
  const { cartStore, navbarStore, assortmentStore } = useAppStore();
  const {
    actions: { fetchCart },
    getters: { count },
  } = cartStore;
  const { status } = assortmentStore.getters;
  const { openNavbar } = navbarStore.actions;
  const [showSubmenu, setShowSubmenu] = useState(false);

  useEffect(() => {
    status === FetchStatus.LOADING && fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <nav className={styles.links}>
      <Link to="cart" className={styles.link}>
        <img className={styles.icon} src={cart} alt="корзина" />
        <span className={styles.counter}>{count > 0 ? count : ''}</span>
      </Link>
      <div className={styles.submenu_container}>
        <img
          className={styles.icon}
          src={user}
          alt="профиль"
          onClick={() => setShowSubmenu((value) => !value)}
        />
        <div className={classNames(styles.submenu, { [styles.show]: showSubmenu })}>
          <Link
            className={styles.submenu_link}
            to="profile"
            onClick={() => setShowSubmenu(() => false)}>
            Профиль
          </Link>
          <Link
            className={styles.submenu_link}
            to="notifications"
            onClick={() => setShowSubmenu(() => false)}>
            Уведомления
          </Link>
        </div>
      </div>
      <img className={styles.icon} src={menu} onClick={() => openNavbar(true)} alt="меню" />
    </nav>
  );
};
