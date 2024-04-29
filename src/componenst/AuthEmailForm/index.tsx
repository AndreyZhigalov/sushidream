import * as yup from 'yup';
import { BigButton } from '..';
import { Formik, Field, Form } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { AuthFormData } from '../../models';
import { useCallback, useState } from 'react';
import { Modal } from '../Modal';
import { useUserActions } from '../../redux/slices/user/user.store';

import styles from './AuthEmailForm.module.scss';

const AuthEmailForm: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const formValidation = yup.object().shape({
    authEmail: yup.string().email('Некорректный Email').required('Обязательное поле'),
  });
  const { authUser } = useUserActions();
  const navigate = useNavigate();

  const setAlert = useCallback((message: string) => {
    setAlertMessage(message);
  }, []);

  return (
    <>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <h2>{alertMessage}</h2>
        <BigButton text="Понятно" onClick={() => setShowModal(false)} />
      </Modal>
      <div className={styles.auth_form}>
        <h2>АВТОРИЗАЦИЯ</h2>
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
            isSubmitting,
          }) => (
            <Form className={styles.form}>
              <label htmlFor="email" className={styles.label}>
                Email
                <Field
                  className={styles.input}
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
              <label htmlFor="password" className={styles.label}>
                Пароль
                <Field
                  className={styles.input}
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
                className={isSubmitting ? 'shining' : ''}
              />
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default AuthEmailForm;
