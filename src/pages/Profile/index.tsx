import { useNavigate } from 'react-router-dom';
import { BigButton } from '../../componenst';
import { useAppStore } from '../../redux/store';

import styles from './Profile.module.scss';
import { ROUTES } from '../../constants/routes';

const Profile = () => {
  const navigate = useNavigate();
  const {
    getters: user,
    actions: { signOutUser },
  } = useAppStore().userStore;

  const [name, lastname] = user.displayName?.split(' ') ?? [];

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.header}>Профиль</h1>
        {/* <CreditCard user={user} /> */}
        <div className={styles.user_data}>
          <p>
            <span>Имя: </span>
            {name}
          </p>
          <p>
            <span>Фамилия: </span>
            {lastname}
          </p>
          <p>
            <span>Номер телефона: </span>
            {user.phoneNumber ?? 'Не указан'}
          </p>
          <p>
            <span>Почта: </span>
            {user.email ?? 'Не указана'}
          </p>
        </div>
        <div className={styles.button_wrapper}>
          <BigButton
            children={'Выйти из аккаунта'}
            onClick={() => signOutUser().then(() => navigate(`${ROUTES.base}${ROUTES.main}`))}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
