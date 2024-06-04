import { Link } from 'react-router-dom';

import logo from '../../assets/logo-primary.svg';
import closeIcon from '../../assets/icons/close.svg';

import styles from './PagesNavigation.module.scss';
import { useAppStore } from '../../redux/store';
import classNames from 'classnames';

export const PagesNavigation = () => {
  const {
    navbarStore: {
      actions: { openNavbar },
      getters: { isOpened },
    },
  } = useAppStore();
  
  const onClick = () => openNavbar(false);

  return (
    <div className={classNames(styles.menu, { [styles.open_menu]: isOpened })}>
      <img className={classNames(styles.image, 'logo')} src={logo} alt="Логотип" />
      <Link className={styles.link} to="./" onClick={onClick}>
        МЕНЮ
      </Link>
      <Link className={styles.link} to="restaurants" onClick={onClick}>
        РЕСТОРАНЫ
      </Link>
      <Link className={styles.link} to="loyalty" onClick={onClick}>
        ПРОГРАММА ЛОЯЛЬНОСТИ
      </Link>
      <Link className={styles.link} to="course" onClick={onClick}>
        КУРС ПО ПОДАЧЕ БЛЮД
      </Link>
      <Link className={styles.link} to="franchise" onClick={onClick}>
        ФРАНШИЗА
      </Link>
      <img className={styles.close_icon} src={closeIcon} alt="close" onClick={onClick} />
    </div>
  );
};
