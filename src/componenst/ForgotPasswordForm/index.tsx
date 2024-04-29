import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

import styles from './ForgotPasswordForm.module.scss';
import { BigButton } from '../BigButton';
import { sendPasswordResetEmail } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../firebase';
import { Modal } from '../Modal';
import { useState } from 'react';

const ForgotPasswordForm = () => {
  const [showModal, setSHowModal] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const formValidation = yup.object().shape({
    email: yup.string().email('Некорректный Email').required('Обязательное поле'),
  });

  return (
    <>
      <Modal open={showModal} style={{ maxWidth: 500 }} onClose={() => setSHowModal(false)}>
        <h2>{alertMessage}</h2>
        <BigButton text="ok" onClick={() => setSHowModal(false)} />
      </Modal>

      <div className={styles.forgot_password_wrapper}>
        <h2>Восстановление пароля</h2>
        <p>Введите имейл от вашей учётной записи</p>
        <Formik
          initialValues={{ email: '' }}
          onSubmit={(values) => {
            sendPasswordResetEmail(FIREBASE_AUTH, values.email)
              .then(() => {
                setAlertMessage('Пиьсмо отправлено на почту');
                setSHowModal(true);
              })
              .catch((error) => {
                const errorMessage = error.message;
                setAlertMessage('Не удалось отправить письмо');
                setSHowModal(true);
                console.error(errorMessage);
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
              <BigButton text={'Восстановить пароль'} onClick={submitForm} isFormValid={isValid} />
            </Form>
          )}
        </Formik>
        <Link to={'../signin'} className={styles.return_link}>
          Назад
        </Link>
      </div>
    </>
  );
};

export default ForgotPasswordForm;
