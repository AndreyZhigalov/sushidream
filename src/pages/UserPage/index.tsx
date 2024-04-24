import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BigButton } from '../../componenst';
import CreditCard from '../../componenst/CreditCard';

import styles from './UserPage.module.scss';
import { useAppStore } from '../../redux/store';

const UserPage = () => {
  const navigate = useNavigate();
  const {
    getters: user,
    actions: { removeUserData },
  } = useAppStore().userStore;
  let uid = localStorage.getItem('uid');

  useEffect(() => {
    if (!uid) {
      navigate('auth');
    }
  }, [uid]);

  const [name, lastname] = user.displayName?.split(' ') ?? [];

  return (
    <>
      {uid && (
        <div className={styles.user_page__wrapper}>
          <div className={styles.header}>
            <h1>Здравствуйте, {user.displayName}!</h1>
          </div>
          <CreditCard user={user} />
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
              {user.phoneNumber}
            </p>
            <p>
              <span>Почта: </span>
              {user.email}
            </p>
          </div>
          <div className={styles.button_wrapper}>
            <BigButton text={'Выйти из аккаунта'} onClick={removeUserData} />
          </div>
        </div>
      )}
    </>
  );
};

export default UserPage;
