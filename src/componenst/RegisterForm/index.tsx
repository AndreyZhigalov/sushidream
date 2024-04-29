import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import Terms from '../Terms';
import { BigButton } from '../../componenst';
import { RegisterFormValidation } from './constants';

import styles from './RegisterForm.module.scss';
import { Modal } from '../Modal';
import { useUserActions } from '../../redux/slices/user/user.store';

const INITIAL_VALUES = {
  name: '',
  lastname: '',
  email: '',
  phoneNumber: '',
  pass: '',
  confirmPass: '',
};

const RegisterForm: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const { createUser } = useUserActions();

  return (
    <>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Terms />
      </Modal>
      <div className={styles.create_account__form}>
        <h2>СОЗДАТЬ АККАУНТ</h2>
        <p>Создайте аккаунт и присоединитесь к нашему сообществу любителей суши</p>
        <Formik
          initialValues={INITIAL_VALUES}
          onSubmit={(values) => createUser(values).then(() => navigate('/profile'))}
          validationSchema={RegisterFormValidation}>
          {({ values, handleBlur, handleChange, handleSubmit, errors, touched, isValid }) => (
            <Form>
              <label htmlFor="name">
                Имя
                <Field
                  type="text"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  placeholder="Алёна"
                />
                {touched.name && errors.name && <p className={styles.error}>{errors.name}</p>}
              </label>
              <label htmlFor="lastname">
                Фамилия
                <Field
                  type="text"
                  name="lastname"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastname}
                  placeholder="Петрова"
                />
                {touched.lastname && errors.lastname && (
                  <p className={styles.error}>{errors.lastname}</p>
                )}
              </label>
              <label htmlFor="email">
                Email
                <Field
                  type="text"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="myawesomeemail@email.com"
                />
                {touched.email && errors.email && <p className={styles.error}>{errors.email}</p>}
              </label>
              <label htmlFor="pass">
                Пароль
                <Field
                  type="password"
                  name="pass"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.pass}
                  placeholder="********"
                  required
                />
                {touched.pass && errors.pass && <p className={styles.error}>{errors.pass}</p>}
              </label>
              <label htmlFor="confirmPass">
                Подтвердите пароль
                <Field
                  type="password"
                  name="confirmPass"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPass}
                  placeholder="********"
                  required
                />
                {touched.confirmPass && errors.confirmPass && (
                  <p className={styles.error}>{errors.confirmPass}</p>
                )}
              </label>
              <BigButton
                text={'Создать аккаунт'}
                onClick={() => handleSubmit()}
                isFormValid={isValid}
              />
            </Form>
          )}
        </Formik>
        <h3>
          или <Link to="../signin">авторизуйтесь</Link>
        </h3>
      </div>
    </>
  );
};

export default RegisterForm;
