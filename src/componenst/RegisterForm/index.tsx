import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import { BigButton } from '../../componenst';
import { RegisterFormValidation } from './constants';

import styles from './RegisterForm.module.scss';
import { useUserActions } from '../../redux/slices/user/user.store';
import { ROUTES } from '../../constants/routes';

const INITIAL_VALUES = {
  name: '',
  lastname: '',
  email: '',
  phoneNumber: '',
  password: '',
  confirmPass: '',
};

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();

  const { createUser } = useUserActions();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>СОЗДАТЬ АККАУНТ</h2>
      <p className={styles.subtitle}>
        Создайте аккаунт и присоединитесь к нашему сообществу любителей суши
      </p>
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={(values) =>
          createUser(values).then(() => navigate(`${ROUTES.base}${ROUTES.profile}`))
        }
        validationSchema={RegisterFormValidation}>
        {({ values, handleBlur, handleChange, handleSubmit, errors, touched, isValid }) => (
          <Form className={styles.form}>
            <label htmlFor="name" className={styles.label}>
              Имя
              <Field
                type="text"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                className={styles.input}
                value={values.name}
                placeholder="Алёна"
              />
              {touched.name && errors.name && <p className={styles.error}>{errors.name}</p>}
            </label>
            <label htmlFor="lastname" className={styles.label}>
              Фамилия
              <Field
                type="text"
                name="lastname"
                onChange={handleChange}
                onBlur={handleBlur}
                className={styles.input}
                value={values.lastname}
                placeholder="Петрова"
              />
              {touched.lastname && errors.lastname && (
                <p className={styles.error}>{errors.lastname}</p>
              )}
            </label>
            <label htmlFor="email" className={styles.label}>
              Email
              <Field
                type="text"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                className={styles.input}
                value={values.email}
                placeholder="myawesomeemail@email.com"
              />
              {touched.email && errors.email && <p className={styles.error}>{errors.email}</p>}
            </label>
            <label htmlFor="pass" className={styles.label}>
              Пароль
              <Field
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                className={styles.input}
                value={values.password}
                placeholder="********"
                required
              />
              {touched.password && errors.password && (
                <p className={styles.error}>{errors.password}</p>
              )}
            </label>
            <label htmlFor="confirmPass" className={styles.label}>
              Подтвердите пароль
              <Field
                type="password"
                name="confirmPass"
                onChange={handleChange}
                onBlur={handleBlur}
                className={styles.input}
                value={values.confirmPass}
                placeholder="********"
                required
              />
              {touched.confirmPass && errors.confirmPass && (
                <p className={styles.error}>{errors.confirmPass}</p>
              )}
            </label>
            <BigButton
              children={'Создать аккаунт'}
              onClick={() => handleSubmit()}
              isDisabled={!isValid}
            />
          </Form>
        )}
      </Formik>
      <h3 className={styles.hint}>
        <span style={{ marginRight: 10 }}>Либо</span>
        <Link to={`${ROUTES.base}${ROUTES.signin}`}>авторизуйтесь</Link>
      </h3>
    </div>
  );
};

export default RegisterForm;
