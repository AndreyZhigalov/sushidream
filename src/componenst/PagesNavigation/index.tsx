import { Link } from 'react-router-dom';

import logo from '../../assets/logo-primary.svg';
import closeIcon from '../../assets/icons/close.svg';

import styles from './PagesNavigation.module.scss';
import { useAppStore } from '../../redux/store';
import classNames from 'classnames';
import { ROUTES } from '../../constants/routes';

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
      <Link className={styles.link} to={`${ROUTES.base}${ROUTES.main}`} onClick={onClick}>
        МЕНЮ
      </Link>
      <Link className={styles.link} to={`${ROUTES.base}${ROUTES.restaurants}`} onClick={onClick}>
        РЕСТОРАНЫ
      </Link>
      <Link className={styles.link} to={`${ROUTES.base}${ROUTES.loyalty}`} onClick={onClick}>
        ПРОГРАММА ЛОЯЛЬНОСТИ
      </Link>
      <Link className={styles.link} to={`${ROUTES.base}${ROUTES.course}`} onClick={onClick}>
        КУРС ПО ПОДАЧЕ БЛЮД
      </Link>
      <Link className={styles.link} to={`${ROUTES.base}${ROUTES.franchise}`} onClick={onClick}>
        ФРАНШИЗА
      </Link>
      <img className={styles.close_icon} src={closeIcon} alt="close" onClick={onClick} />
    </div>
  );
};
