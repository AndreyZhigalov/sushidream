import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../Hooks/hooks';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import * as yup from 'yup';

import { toggleTerms } from '../../redux/slices/modalWindowSlice';
import { Field, Form, Formik } from 'formik';
import Terms from '../ModalWindows/Terms';
import { BigButton } from '../../componenst';

import styles from './RegisterForm.module.scss';

type CreateAccountForm = {
  gender: string;
  name: string;
  lastName: string;
  phoneNumber: string;
  day: string;
  month: string;
  year: string;
  email: string;
  pass: string;
  confirmPass: string;
  terms: boolean;
  loyalty: boolean;
  news: boolean;
};

const phoneRegExp =
  /^(\+7|7|8)?[\s\\-]?\(?[489][0-9]{2}\)?[\s\\-]?[0-9]{3}[\s\\-]?[0-9]{2}[\s\\-]?[0-9]{2}$/;

const RegisterForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const RegisterFormValidation = yup.object().shape({
    gender: yup.string().required('Выберите пол'),
    name: yup
      .string()
      .matches(/\D/i, 'Не может содержать символы и цифры')
      .required('Обязательное поле'),
    lastName: yup
      .string()
      .matches(/\D/i, 'Не может содержать символы и цифры')
      .required('Обязательное поле'),
    phoneNumber: yup
      .string()
      .matches(phoneRegExp, 'Некорректный номер телефона')
      .required('Обязательное поле'),
    day: yup.string().required('Выберите день'),
    month: yup.string().required('Выберите месяц'),
    year: yup.string().required('Выберите год'),
    email: yup.string().email('Некорректный email').required('Обязательное поле'),
    pass: yup
      .string()
      .min(8, `от 8 символов`)
      .matches(/[A-ZА-ЯЁ]+/u, 'Минимум одна заглавная буква')
      .matches(/[a-zа-яё]+/u, 'Минимум одна строчная буква')
      .matches(/\W+/, 'Минимум один символ "!"№;%:?*()_+{}[]<>?/.,"')
      .required('Обязательное поле'),
    confirmPass: yup.string().oneOf([yup.ref('pass')], 'Пароли не совпадают'),
    terms: yup
      .bool()
      .oneOf([true], 'Согласие с условиями создания аккаунта обязательно.')
      .required('Обязательно'),
  });

  const fullYear = React.useRef(new Date().getFullYear());

  const days: string[] = [];
  while (days.length < 31) days.push(`${days.length + 1}`);

  const months: string[] = [];
  while (months.length < 12) months.push(`${months.length + 1}`);

  let years: string[] = [];
  while (years.length < 100) years.push(`${fullYear.current - 18 - years.length}`);

  return (
    <div className={styles.create_account__form}>
      <Terms />
      <h2>СОЗДАТЬ АККАУНТ</h2>
      <p>Создайте аккаунт и присоединитесь к нашему сообществу любителей суши</p>
      <Formik
        initialValues={{
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
        }}
        onSubmit={(values: CreateAccountForm) => {
          createUserWithEmailAndPassword(auth, values.email, values.pass)
            .then((userCredential) => {
              axios.post(`https://62e206223891dd9ba8def88d.mockapi.io/user`, {
                ...values,
                uid: userCredential.user.uid,
                birthDay: values.day + '.' + values.month + '.' + values.year,
              });
              navigate('../auth');
            })
            .catch((error) => {
              console.error(error);
            });
        }}
        validationSchema={RegisterFormValidation}>
        {({ values, handleBlur, handleChange, handleSubmit, errors, touched, isValid, dirty }) => (
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
                  <span className={styles.terms_link} onClick={() => dispatch(toggleTerms())}>
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

            <BigButton text={'Создать аккаунт'} anyFunc={handleSubmit} isFormValid={isValid} />
          </Form>
        )}
      </Formik>
      <h3>
        или <Link to="../auth">авторизуйтесь</Link>
      </h3>
    </div>
  );
};

export default RegisterForm;
