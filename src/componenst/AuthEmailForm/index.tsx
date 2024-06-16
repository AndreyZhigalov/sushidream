import * as yup from 'yup';
import { BigButton } from '..';
import { Formik, Field, Form } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { AuthFormData } from '../../models';
import { useCallback, useState } from 'react';
import { Modal } from '../Modal';
import { useUserActions } from '../../redux/slices/user/user.store';
import classNames from 'classnames';

import styles from './AuthEmailForm.module.scss';
import { ROUTES } from '../../constants/routes';

const FORM_VALIDATION = yup.object().shape({
  authEmail: yup.string().email('Некорректный Email').required('Обязательное поле'),
});

const AuthEmailForm: React.FC<{ title?: string }> = ({ title }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const { authUser } = useUserActions();
  const navigate = useNavigate();

  const setAlert = useCallback((message: string) => {
    setAlertMessage(message);
  }, []);

  return (
    <>
      <Modal open={showModal} onClose={() => setShowModal(false)} style={{ maxWidth: 500 }}>
        <h2>{alertMessage}</h2>
        <BigButton children="Понятно" onClick={() => setShowModal(false)} />
      </Modal>
      <div className={styles.auth_form}>
        <h2 className={classNames(styles.title, { [styles.hide]: !title })}>{title}</h2>
        <Formik
          initialValues={{
            authEmail: '',
            password: '',
          }}
          validateOnBlur
          validationSchema={FORM_VALIDATION}
          onSubmit={(values: AuthFormData) =>
            authUser(values)
              .then(() => navigate(`${ROUTES.base}${ROUTES.profile}`))
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
                <p
                  className={classNames(styles.error, {
                    [styles.hide]: !(touched.authEmail && errors.authEmail),
                  })}>
                  {errors.authEmail}
                </p>
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
              <Link
                to={`${ROUTES.base}${ROUTES.forgotPassword}`}
                className={styles.forgot_password}>
                Забыли пароль?
              </Link>
              <BigButton
                children={'Авторизоваться'}
                onClick={() => handleSubmit()}
                isDisabled={!isValid}
                className={classNames({ shining: isSubmitting })}
              />
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default AuthEmailForm;
