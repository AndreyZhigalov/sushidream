import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BigButton } from '../../../componenst';
import { useAppDispatch, useAppSelector } from '../../../Hooks/hooks';
import { removeUserData } from '../../../redux/slices/userSlice';

import styles from './UserPage.module.scss';

const UserPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);

  React.useEffect(() => {
    if (!user.uid) {
      navigate('auth');
    }
  }, [user.uid]);

  return (
    <div className={styles.userPage_wrapper}>
      <div className={styles.header}>
        <h1>Здравствуйте, {user.name}!</h1>
      </div>
      <div className={styles.loyaltyProgramm}>
        <h1>Ваша программа лояльности</h1>
        <div className={styles.card}>
          <h2>SUSHIDREAM</h2>
          <p>5555 5555 5555 5555</p>
          <p>{`${user.name} ${user.lastName}`}</p>
        </div>
      </div>
      <div className={styles.userData}>
        <p>
          <span>Имя: </span>
          {user.name}
        </p>
        <p>
          <span>Фамилия: </span>
          {user.lastName}
        </p>
        <p>
          <span>Номер телефона: </span>
          {user.phoneNumber}
        </p>
        <p>
          <span>Почта: </span>
          {user.email}
        </p>
        <p>
          <span>День рождения: </span>
          {user.birthDay}
        </p>
      </div>
      <BigButton text={'Выйти из аккаунта'} anyFunc={() => dispatch(removeUserData())} />
    </div>
  );
};

export default UserPage;
