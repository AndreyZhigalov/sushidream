import * as yup from 'yup';
import { BigButton } from '../../componenst';
import { Formik, Field, Form } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { AuthFormData } from '../../models';
import { useState } from 'react';
import { Modal } from '../Modal';
import { useUserActions } from '../../redux/slices/user/user.store';

import styles from './AuthForm.module.scss';

const AuthForm: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const formValidation = yup.object().shape({
    authEmail: yup.string().email('Некорректный Email').required('Обязательное поле'),
  });
  const { authUser } = useUserActions();
  const navigate = useNavigate();
  const setAlert = (message: string) => {
    setAlertMessage(message);
  };

  return (
    <>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <h2>{alertMessage}</h2>
        <BigButton text="Понятно" onClick={() => setShowModal(false)} />
      </Modal>
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
          onSubmit={(values: AuthFormData) =>
            authUser(values)
              .then(() => navigate('/profile'))
              .catch(() => setAlert('Ошибка авторизации'))
          }>
          {({
            values,
            handleChange,
            handleSubmit,
            errors,
            touched,
            handleBlur,
            isValid,
            dirty,
          }) => (
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
              <Link to={'../forgot-password'} className={styles.forgot_password}>
                Забыли пароль?
              </Link>
              <BigButton
                text={'Авторизоваться'}
                onClick={() => handleSubmit()}
                isFormValid={isValid}
              />
            </Form>
          )}
        </Formik>
        <h3>
          или <Link to="../signup">зарегистрируйтесь</Link>
        </h3>
      </div>
    </>
  );
};

export default AuthForm;
