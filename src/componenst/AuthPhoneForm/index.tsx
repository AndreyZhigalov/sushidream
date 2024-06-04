import * as yup from 'yup';
import { BigButton } from '..';
import { Formik, Field, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { Modal } from '../Modal';
import { useUserActions } from '../../redux/slices/user/user.store';
import { PHONE_NUMBER_REGEXP } from '../RegisterForm/constants';
import { ConfirmationResult } from 'firebase/auth';
import classNames from 'classnames';

import styles from './AuthPhoneForm.module.scss';

const PHONE_VALIDATION = yup.object().shape({
  phoneNumber: yup.string().matches(PHONE_NUMBER_REGEXP, 'Неверный формат номера телефона'),
});
const CODE_VALIDATION = yup.object().shape({
  code: yup.string(),
});

type AuthPhoneFormProps = {
  hasRedirect?: boolean;
  handler?: () => unknown;
};

const AuthPhoneForm: React.FC<AuthPhoneFormProps> = ({ hasRedirect, handler }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [confirmResult, setConfirmResult] = useState<ConfirmationResult | string>();
  const { authUserWithPhone, confirmAuthUserWithPhone } = useUserActions();
  const navigate = useNavigate();

  const setAlert = useCallback((message: string) => {
    setAlertMessage(message);
  }, []);

  const onSubmit = useCallback(
    (values: { phoneNumber: string }) =>
      authUserWithPhone(values.phoneNumber)
        .then((confirm) => {
          if (!confirm) throw new Error('Ошибка авторизации');
          setConfirmResult(confirm);
        })
        .catch((error) => setAlert(error.message)),
    [authUserWithPhone, setAlert],
  );

  const onConfirmSubmit = useCallback(
    async ({ code }: { code: string }) => {
      if (!confirmResult) return;

      const isString = typeof confirmResult === 'string';

      try {
        if (isString) {
          await confirmAuthUserWithPhone({ code, providerId: confirmResult });
        } else {
          await confirmAuthUserWithPhone({ code, confirmResult: confirmResult });
        }
        handler?.();
        hasRedirect && navigate('/profile');
      } catch (error) {
        console.error(error);
        setAlert('Неверный код');
      }
    },
    [confirmAuthUserWithPhone, confirmResult, handler, hasRedirect, navigate, setAlert],
  );

  return (
    <>
      <Modal open={showModal} onClose={() => setShowModal(false)} style={{ maxWidth: 500 }}>
        <h2>{alertMessage}</h2>
        <BigButton children="Понятно" onClick={() => setShowModal(false)} />
      </Modal>

      <div className={classNames(styles.auth_form, { [styles.hide]: !!confirmResult })}>
        <h2 className={styles.title}>АВТОРИЗАЦИЯ</h2>
        <Formik
          initialValues={{
            phoneNumber: '',
          }}
          validateOnBlur
          validationSchema={PHONE_VALIDATION}
          onSubmit={onSubmit}>
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
                children={'Получить код'}
                isDisabled={!isValid}
                isLoading={isSubmitting}
                type="submit"
                id="auth-button"
                className={classNames({ shining: isSubmitting })}
              />
            </Form>
          )}
        </Formik>
      </div>

      <div className={classNames(styles.auth_form, { [styles.hide]: !confirmResult })}>
        <h2 className={styles.title}>АВТОРИЗАЦИЯ</h2>
        <p className={styles.second_title}>Код для подтверждения авторизации</p>
        <Formik
          initialValues={{
            code: '',
          }}
          validateOnBlur
          validationSchema={CODE_VALIDATION}
          onSubmit={onConfirmSubmit}>
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
                children={'Войти'}
                isDisabled={!isValid}
                isLoading={isSubmitting}
                type="submit"
                id="auth-button"
                className={classNames({ shining: isSubmitting })}
              />
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default AuthPhoneForm;
