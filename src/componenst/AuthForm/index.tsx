import React from 'react';

import { BigButton } from '../../componenst';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import styles from './AuthForm.module.scss';
import qs from 'qs';
import axios from 'axios';

export const AuthForm: React.FC = () => {
  return (
    <div className={styles.auth_form}>
      <h2>АВТОРИЗАЦИЯ</h2>
      <p>Введите ваш Email и пароль, чтобы войти в аккаунт</p>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={(
          values: { email: string; password: string },
          { setSubmitting }: FormikHelpers<{ email: string; password: string }>,
        ) => {
          let data = qs.stringify({ email: values.email, password: values.password });
          axios.post(`https://62e206223891dd9ba8def88d.mockapi.io/user`, data);
        }}>
        {({ isSubmitting, submitForm }) => (
          <Form>
            <label htmlFor="email">
              Email
              <Field
                type="email"
                name="email"
                id="email"
                placeholder="myawesomeemail@email.com"
                required
              />
            </label>
            <label htmlFor="password">
              Пароль
              <Field type="password" name="password" id="password" placeholder="*******" required />
            </label>
            <a href="" className={styles.forgotPass}>
              Забыли пароль?
            </a>

            <BigButton text={'Авторизоваться'} anyFunc={submitForm} disable={isSubmitting} />
          </Form>
        )}
      </Formik>
    </div>
  );
};
