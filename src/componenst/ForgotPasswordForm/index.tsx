import React from 'react';
import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

import styles from './ForgotPasswordForm.module.scss';
import { BigButton } from '../BigButton';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase';
import { useAppDispatch } from '../../Hooks/hooks';
import { setAlert } from '../../redux/slices/modalWindowSlice';

const ForgotPasswordForm = () => {
    const dispatch = useAppDispatch()
  const formValidation = yup.object().shape({
    email: yup.string().email('Некорректный Email').required('Обязательное поле'),
  });

  return (
    <div className={styles.forgot_password_wrapper}>
      <h2>Восстановление пароля</h2>
      <p>Введите имейл от вашей учётной записи</p>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={(values) => {
          sendPasswordResetEmail(auth, values.email)
            .then(() => {
              dispatch(setAlert('Пиьсмо отправлено на почту'));
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              dispatch(setAlert("Не удалось отправить письмо"));
              throw new Error(errorMessage)
            });
        }}
        validationSchema={formValidation}>
        {({ handleChange, values, handleBlur, errors, touched, isValid, submitForm }) => (
          <Form>
            <input
              type="email"
              id="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              name="email"
              placeholder="myemail@mail.ru"
            />
            {errors.email && touched.email && <p className={styles.error}>{errors.email}</p>}
            <BigButton text={'Восстановить пароль'} anyFunc={submitForm} isFormValid={isValid} />
          </Form>
        )}
      </Formik>
      <Link to={'../auth'} className={styles.return_link}>
        Назад
      </Link>
    </div>
  );
};

export default ForgotPasswordForm;
