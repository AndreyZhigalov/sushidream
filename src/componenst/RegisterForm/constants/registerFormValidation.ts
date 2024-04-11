import * as yup from 'yup';
import { PHONE_NUMBER_REGEXP } from './phoneNumberRegexp';

export const RegisterFormValidation = yup.object().shape({
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
    .matches(PHONE_NUMBER_REGEXP, 'Некорректный номер телефона')
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
