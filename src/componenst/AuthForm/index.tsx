import React from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';
import * as yup from 'yup';
import { BigButton } from '../../componenst';
import { Formik, Field, Form } from 'formik';

import styles from './AuthForm.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../Hooks/hooks';
import { setuser_data } from '../../redux/slices/userSlice';

type AuthFormType = {
  authEmail: string;
  password: string;
};

const AuthForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const formValidation = yup.object().shape({
    authEmail: yup.string().email('Некорректный Email').required('Обязательное поле'),   
  });

  return (
    <div className={styles.auth_form}>
      <h2>АВТОРИЗАЦИЯ</h2>
      <p>Введите ваш Email и пароль, чтобы войти в аккаунт</p>
      <Formik
        initialValues={{
          authEmail: '',
          password: '',
        }}
        validateOnBlur
        validationSchema={formValidation}
        onSubmit={(values: AuthFormType) => {
          const auth = getAuth();
          signInWithEmailAndPassword(auth, values.authEmail, values.password)
            .then((userCredential) => {
              axios
                .get(
                  `https://62e206223891dd9ba8def88d.mockapi.io/user/?uid=${userCredential.user.uid}`,
                )
                .then((resp) => {
                  dispatch(setuser_data(resp.data));
                  navigate('../');
                });
            })
            .catch((error) => {              
              alert('Неверный логин или пароль');
              throw new Error(error);
            });
        }}>
        {({ values, handleChange, handleSubmit, errors, touched, handleBlur, isValid, dirty }) => (
          <Form>
            <label htmlFor="email">
              Email
              <Field
                type="email"
                name="authEmail"
                id="email"
                onChange={handleChange}
                value={values.authEmail}
                onBlur={handleBlur}
                placeholder="myawesomeemail@email.com"
                required
              />
              {touched.authEmail && errors.authEmail && (
                <p className={styles.error}>{errors.authEmail}</p>
              )}
            </label>
            <label htmlFor="password">
              Пароль
              <Field
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
                value={values.password}
                onBlur={handleBlur}
                placeholder="*******"
                required></Field>              
            </label>
            <a href="" className={styles.forgot_password}>
              Забыли пароль?
            </a>
            <BigButton text={'Авторизоваться'} anyFunc={handleSubmit} isFormValid={isValid} />
          </Form>
        )}
      </Formik>
      <h3>
        или <Link to="../signup">зарегистрируйтесь</Link>
      </h3>
    </div>
  );
};

export default AuthForm;
