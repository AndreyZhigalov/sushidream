import * as yup from 'yup';
// import { PHONE_NUMBER_REGEXP } from './phoneNumberRegexp';

export const RegisterFormValidation = yup.object().shape({
  name: yup
    .string()
    .min(2, 'От двух букв')
    .max(35, 'Слишком длинное имя')
    .required('Обязательное поле'),
  lastname: yup
    .string()
    .min(2, 'От двух букв')
    .max(35, 'Слишком длинная фамилия')
    .required('Обязательное поле'),
  // phoneNumber: yup.string().matches(PHONE_NUMBER_REGEXP),
  email: yup.string().email('Некорректный email').required('Обязательное поле'),
  pass: yup
    .string()
    .min(8, `от 8 символов`)
    .matches(/[A-ZА-ЯЁ]+/u, 'Минимум одна заглавная буква')
    .matches(/[a-zа-яё]+/u, 'Минимум одна строчная буква')
    .matches(/\W+/, 'Минимум один символ "!"№;%:?*()_+{}[]<>?/.,"')
    .required('Обязательное поле'),
  confirmPass: yup.string().oneOf([yup.ref('pass')], 'Пароли не совпадают'),
});
