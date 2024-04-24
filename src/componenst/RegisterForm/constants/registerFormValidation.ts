import * as yup from 'yup';

export const RegisterFormValidation = yup.object().shape({
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
