import { Field, Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { BigButton } from '../../BigButton';
import { useAppStore } from '../../../redux/store';
import { PHONE_NUMBER_REGEXP } from '../../RegisterForm/constants';
import { Modal } from '..';
import { useState } from 'react';

const GetPhone = ({ isOpen }: { isOpen: boolean }) => {
  const [showModal, setShowModal] = useState<boolean>(isOpen);
  const { orderStore, userStore } = useAppStore();
  const { getOrder } = orderStore.actions;
  const { setPhone } = userStore.actions;

  const phoneValidation = yup.object().shape({
    phoneNumber: yup
      .string()
      .matches(PHONE_NUMBER_REGEXP, 'Некорректный номер телефона')
      .required('Обязательное поле'),
  });

  const closeModal = () => setShowModal(false);

  return (
    <Modal open={showModal} header={'Оставьте номер телефона, чтобы мы могли связаться с вами'}>
      <Formik
        initialValues={{
          phoneNumber: '',
        }}
        onSubmit={(values) => {
          setPhone(values.phoneNumber);
          getOrder();
          closeModal();
        }}
        validationSchema={phoneValidation}>
        {({ values, handleBlur, handleChange, handleSubmit, errors, touched, isValid, dirty }) => {
          return (
            <Form>
              <Field
                type="text"
                name="phoneNumber"
                placeholder="+79553654955"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phoneNumber}
                required
              />
              {touched.phoneNumber && errors.phoneNumber && <p>{errors.phoneNumber}</p>}
              <div>
                <BigButton text="Сохранить" onClick={() => handleSubmit()} isFormValid={isValid} />
                <BigButton text="Отмена" onClick={closeModal} />
              </div>
            </Form>
          );
        }}
      </Formik>
      <p>
        Или{' '}
        <Link to={'profile/signup'} onClick={closeModal}>
          зарегистрируйтесь
        </Link>
      </p>
    </Modal>
  );
};

export default GetPhone;
