import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../../Hooks/hooks';
import { getOrder } from '../../../redux/slices/cartSlice';
import { closeAlert, modalSelector } from '../../../redux/slices/modalWindowSlice';
import { setPhone } from '../../../redux/slices/userSlice';
import { BigButton } from '../../BigButton';
import { phoneRegExp } from '../../RegisterForm';

import styles from '../ModalWindow.module.scss';

const GetPhone = () => {
  const dispatch = useAppDispatch();
  const { showGetPhoneModal } = useAppSelector(modalSelector);

  const phoneValidation = yup.object().shape({
    phoneNumber: yup
      .string()
      .matches(phoneRegExp, 'Некорректный номер телефона')
      .required('Обязательное поле'),
  });

  const closeModal = () => {
    setTimeout(() => dispatch(closeAlert()), 500);
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
            dispatch(setPhone(values.phoneNumber));
            dispatch(getOrder());
            dispatch(closeAlert());
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
