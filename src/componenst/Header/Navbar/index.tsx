import { useState } from 'react';

import { Link } from 'react-router-dom';

import cart from '../../../assets/icons/cart.svg';
import menu from '../../../assets/icons/menu.svg';
import user from '../../../assets/icons/user.svg';
import { ROUTES } from '../../../constants/routes';
import { useNavbarActions } from '../../../redux/slices/navbar';
import { useCartGetters } from '../../../redux/slices/cart';

import styles from './Navbar.module.scss';

import classNames from 'classnames';

export const Navbar: React.FC = () => {
  const { count } = useCartGetters();
  const { openNavbar } = useNavbarActions();
  const [showSubmenu, setShowSubmenu] = useState(false);

  return (
    <nav className={styles.links}>
      <Link to={`${ROUTES.base}${ROUTES.cart}`} className={styles.link}>
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
            to={`${ROUTES.base}${ROUTES.profile}`}
            onClick={() => setShowSubmenu(() => false)}>
            Профиль
          </Link>
          <Link
            className={styles.submenu_link}
            to={`${ROUTES.base}${ROUTES.notification}`}
            onClick={() => setShowSubmenu(() => false)}>
            Уведомления
          </Link>
        </div>
      </div>
      <img className={styles.icon} src={menu} onClick={() => openNavbar(true)} alt="меню" />
    </nav>
  );
};
