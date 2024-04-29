import * as yup from 'yup';
import { BigButton } from '..';
import { Formik, Field, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { Modal } from '../Modal';
import { useUserActions } from '../../redux/slices/user/user.store';

import styles from './AuthPhoneForm.module.scss';
import { PHONE_NUMBER_REGEXP } from '../RegisterForm/constants';
import { ConfirmationResult } from 'firebase/auth';

const AuthPhoneForm: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [confirmResult, setConfirmResult] = useState<ConfirmationResult>();
  const phoneValidation = yup.object().shape({
    phoneNumber: yup.string().matches(PHONE_NUMBER_REGEXP, 'Неверный формат номера телефона'),
  });
  const codeValidation = yup.object().shape({
    code: yup.string(),
  });
  const { authUserWithPhone, confirmAuthUserWithPhone } = useUserActions();
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
      {!confirmResult && (
        <div className={styles.auth_form}>
          <h2>АВТОРИЗАЦИЯ</h2>
          <Formik
            initialValues={{
              phoneNumber: '',
            }}
            validateOnBlur
            validationSchema={phoneValidation}
            onSubmit={(values: { phoneNumber: string }) =>
              authUserWithPhone(values.phoneNumber)
                .then((confirm) => {
                  if (!confirm) throw new Error("'Ошибка авторизации'");
                  setConfirmResult(confirm);
                })
                .catch((error) => setAlert(error))
            }>
            {({ values, handleChange, errors, touched, handleBlur, isValid, isSubmitting }) => (
              <Form className={styles.form}>
                <label htmlFor="phoneNumber" className={styles.label}>
                  Телефон
                  <Field
                    className={styles.input}
                    type="phone"
                    name="phoneNumber"
                    id="phone"
                    onChange={handleChange}
                    value={values.phoneNumber}
                    onBlur={handleBlur}
                    placeholder="+78005553535"
                    required
                  />
                  {touched.phoneNumber && errors.phoneNumber && (
                    <p className={styles.error}>{errors.phoneNumber}</p>
                  )}
                </label>
                <BigButton
                  text={'Получить код'}
                  isFormValid={isValid}
                  type="submit"
                  id="auth-button"
                  className={isSubmitting ? 'shining' : ''}
                />
              </Form>
            )}
          </Formik>
        </div>
      )}
      {!!confirmResult && (
        <div className={styles.auth_form}>
          <h2>АВТОРИЗАЦИЯ</h2>
          <p>Код для подтверждения авторизации</p>
          <Formik
            initialValues={{
              code: '',
            }}
            validateOnBlur
            validationSchema={codeValidation}
            onSubmit={({ code }: { code: string }) =>
              confirmAuthUserWithPhone({ code, confirmResult })
                .then(() => navigate('/profile'))
                .catch(() => setAlert('Неверный код'))
            }>
            {({ values, handleChange, errors, touched, handleBlur, isValid, isSubmitting }) => (
              <Form className={styles.form}>
                <label htmlFor="code" className={styles.label}>
                  Проверочный код
                  <Field
                    className={styles.input}
                    type="text"
                    name="code"
                    id="code"
                    onChange={handleChange}
                    value={values.code}
                    onBlur={handleBlur}
                    placeholder=""
                    required
                  />
                  {touched.code && errors.code && <p className={styles.error}>{errors.code}</p>}
                </label>
                <BigButton
                  text={'Войти'}
                  isFormValid={isValid}
                  type="submit"
                  id="auth-button"
                  className={isSubmitting ? 'shining' : ''}
                />
              </Form>
            )}
          </Formik>
        </div>
      )}
    </>
  );
};

export default AuthPhoneForm;
