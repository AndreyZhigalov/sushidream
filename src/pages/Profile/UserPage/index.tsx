import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BigButton } from '../../../componenst';
import { useAppDispatch, useAppSelector } from '../../../Hooks/hooks';
import { removeuser_data } from '../../../redux/slices/userSlice';

import styles from './UserPage.module.scss';

const UserPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);
  let email = localStorage.getItem('email');
  
  React.useEffect(() => {
    if (!email) {
      navigate('auth');
    }
  }, [email]);

  return (
    <>
      {email && (
        <div className={styles.user_page__wrapper}>
          <div className={styles.header}>
            <h1>Здравствуйте, {user.name}!</h1>
          </div>
          <figure className={styles.card_container}>
            <h3 className={styles.card_title}>sushidream</h3>
            <ul className={styles.card_number}>
              <li className={styles.card_number_part}>5436</li>
              <li className={styles.card_number_part}>2623</li>
              <li className={styles.card_number_part}>7754</li>
              <li className={styles.card_number_part}>1347</li>
            </ul>
            <div className={styles.card_data_wrapper}>
              <div className={styles.card_data}>
                <small className={styles.card_data_header}>Владелец</small>
                <p>
                  <span className={styles.card_name}>{user.name}</span>{' '}
                  <span className={styles.card_surname}>{user.lastName}</span>
                </p>
              </div>
              <div className={styles.card_data}>
                <small className={styles.card_data_header}>Срок</small>
                <p>
                  <span className={styles.card_month}>09</span>/
                  <span className={styles.card_year}>26</span>
                </p>
              </div>
            </div>
          </figure>
          <div className={styles.user_data}>
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
          <BigButton text={'Выйти из аккаунта'} anyFunc={() => dispatch(removeuser_data())} />
        </div>
      )}
    </>
  );
};

export default UserPage;
