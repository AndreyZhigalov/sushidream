import { Link } from 'react-router-dom';

import logo from '../../assets/logo-primary.svg';
import closeIcon from '../../assets/icons/close.svg';

import styles from './PagesNavigation.module.scss';
import { useAppStore } from '../../redux/store';

export const PagesNavigation = () => {
  const { navbarStore: { actions: { openNavbar }, getters: { isOpened } } } = useAppStore()
  const onLinkClick = () => openNavbar(false)

  return (
    <div className={`${styles.menu} ${isOpened ? styles.open_menu : ''}`}>
      <img src={logo} alt="Логотип" className="logo" />
      <Link to="./" onClick={onLinkClick}>
        МЕНЮ
      </Link>
      <Link to="restaurants" onClick={onLinkClick}>
        РЕСТОРАНЫ
      </Link>
      <Link to="loyalty" onClick={onLinkClick}>
        ПРОГРАММА ЛОЯЛЬНОСТИ
      </Link>
      <Link to="course" onClick={onLinkClick}>
        КУРС ПО ПОДАЧЕ БЛЮД
      </Link>
      <Link to="franchise" onClick={onLinkClick}>
        ФРАНШИЗА
      </Link>
      <img src={closeIcon} alt="close" onClick={onLinkClick} />
    </div>
  );
};
