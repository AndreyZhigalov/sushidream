import { Field, Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { BigButton } from '../../BigButton';


import styles from '../ModalWindow.module.scss';
import { useAppStore } from '../../../redux/store';
import { PHONE_NUMBER_REGEXP } from '../../RegisterForm/constants';

const GetPhone = () => {
  const { modalStore, orderStore, userStore } = useAppStore()
  const { closeAlert } = modalStore.actions
  const { showGetPhoneModal } = modalStore.getters
  const { getOrder } = orderStore.actions
  const { setPhone } = userStore.actions

  const phoneValidation = yup.object().shape({
    phoneNumber: yup
      .string()
      .matches(PHONE_NUMBER_REGEXP, 'Некорректный номер телефона')
      .required('Обязательное поле'),
  });

  const closeModal = () => {
    setTimeout(() => closeAlert(), 500);
  };

  return (
    <div className={`${styles.overlay} ${showGetPhoneModal ? styles.showModal : ''}`}>
      <div className={styles.modal_window}>
        <h2 className={styles.message}>Оставьте номер телефона, чтобы мы могли связаться с вами</h2>
        <Formik
          initialValues={{
            phoneNumber: '',
          }}
          onSubmit={(values) => {
            setPhone(values.phoneNumber);
            getOrder();
            closeAlert();
          }}
          validationSchema={phoneValidation}>
          {({
            values,
            handleBlur,
            handleChange,
            handleSubmit,
            errors,
            touched,
            isValid,
            dirty,
          }) => {
            return (
              <Form>
                <Field
                  className={styles.input}
                  type="text"
                  name="phoneNumber"
                  placeholder="+79553654955"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phoneNumber}
                  required
                />
                {touched.phoneNumber && errors.phoneNumber && (
                  <p className={styles.error}>{errors.phoneNumber}</p>
                )}
                <div className={styles.buttons_container}>
                  <BigButton text="Сохранить" anyFunc={handleSubmit} isFormValid={isValid} />
                  <BigButton text="Отмена" anyFunc={closeModal} />
                </div>
              </Form>
            );
          }}
        </Formik>
        <p className={styles.link}>
          Или{' '}
          <Link to={'profile/signup'} onClick={closeModal}>
            зарегистрируйтесь
          </Link>
        </p>
      </div>
    </div>
  );
};

export default GetPhone;
