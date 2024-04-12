import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import Terms from '../Terms';
import { BigButton } from '../../componenst';
import { RegisterFormValidation } from './constants';
import { createUser } from '../../Hooks/createUser';

import styles from './RegisterForm.module.scss';
import { Modal } from '../Modal';

const RegisterForm: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const fullYear = React.useRef(new Date().getFullYear());
  const navigate = useNavigate();
  const days: string[] = [];
  while (days.length < 31) days.push(`${days.length + 1}`);

  const months: string[] = [];
  while (months.length < 12) months.push(`${months.length + 1}`);

  let years: string[] = [];
  while (years.length < 100) years.push(`${fullYear.current - 18 - years.length}`);

  const formInitialValues = {
    gender: '',
    name: '',
    lastName: '',
    phoneNumber: '',
    day: '',
    month: '',
    year: '',
    email: '',
    pass: '',
    confirmPass: '',
    terms: false,
    loyalty: false,
    news: false,
  };

  return (
    <>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Terms />
      </Modal>
      <div className={styles.create_account__form}>
        <Terms />
        <h2>СОЗДАТЬ АККАУНТ</h2>
        <p>Создайте аккаунт и присоединитесь к нашему сообществу любителей суши</p>
        <Formik
          initialValues={formInitialValues}
          onSubmit={(values) => createUser(values, navigate)}
          validationSchema={RegisterFormValidation}>
          {({
            values,
            handleBlur,
            handleChange,
            handleSubmit,
            errors,
            touched,
            isValid,
            dirty,
          }) => (
            <Form>
              <div className={styles.gender_block}>
                <label htmlFor="male">
                  <Field type="radio" name="gender" id="male" value="male" />
                  Мужчина
                </label>
                <label htmlFor="female">
                  <Field type="radio" name="gender" id="female" value="female" />
                  Женщина
                </label>
                {touched.gender && errors.gender && <p className={styles.error}>{errors.gender}</p>}
              </div>
              <label htmlFor="name">
                Имя
                <Field
                  type="text"
                  name="name"
                  placeholder="Дмитрий"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  required
                />
                {touched.name && errors.name && <p className={styles.error}>{errors.name}</p>}
              </label>
              <label htmlFor="lastName">
                Фамилия
                <Field
                  type="text"
                  name="lastName"
                  placeholder="Петров"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                  required
                />
                {touched.lastName && errors.lastName && (
                  <p className={styles.error}>{errors.lastName}</p>
                )}
              </label>
              <label htmlFor="phoneNumber">
                Телефон
                <Field
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
              </label>
              <label className={styles.date_block}>
                <span>День рождения</span>
                <select
                  name="day"
                  title="День рождения"
                  id="day"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.day}
                  required>
                  <option value="">День</option>
                  {days.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
                <select
                  name="month"
                  title="Месяц рождения"
                  id="month"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.month}
                  required>
                  <option value="">Месяц</option>
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                <select
                  name="year"
                  title="Год рождения"
                  id="year"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.year}
                  required>
                  <option value="">Год</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </label>
              {touched.day && errors.day && <p className={styles.error}>{errors.day}</p>}
              {touched.month && errors.month && <p className={styles.error}>{errors.month}</p>}
              {touched.year && errors.year && <p className={styles.error}>{errors.year}</p>}
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
              <div className={styles.divider} />
              <label htmlFor="terms">
                <Field type="checkbox" name="terms" id="terms" required />
                <div>
                  <p>
                    Я прочёл и согласен с{' '}
                    <span className={styles.terms_link} onClick={() => setShowModal(true)}>
                      условиями создания аккаунта
                    </span>
                  </p>
                </div>
              </label>
              <label htmlFor="news">
                <Field type="checkbox" name="news" id="news" />
                <div>
                  <p>Я хочу получать уведомления о новых акциях</p>
                </div>
              </label>
              <label htmlFor="loyalty">
                <Field type="checkbox" name="loyalty" id="loyalty" />
                <div>
                  <p>Я хочу участвовать в программе лояльности от Sushidream</p>
                </div>
              </label>
              {touched.terms && errors.terms && <p className={styles.error}>{errors.terms}</p>}

              <BigButton
                text={'Создать аккаунт'}
                onClick={() => handleSubmit()}
                isFormValid={isValid}
              />
            </Form>
          )}
        </Formik>
        <h3>
          или <Link to="../auth">авторизуйтесь</Link>
        </h3>
      </div>
    </>
  );
};

export default RegisterForm;
