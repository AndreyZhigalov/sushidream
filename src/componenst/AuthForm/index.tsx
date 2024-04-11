import * as yup from 'yup';
import { BigButton } from '../../componenst';
import { Formik, Field, Form } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { authUser } from '../../Hooks/authUser';

import styles from './AuthForm.module.scss';
import { AuthFormData } from '../../models';
import { useAppStore } from '../../redux/store';

const AuthForm: React.FC = () => {
  const formValidation = yup.object().shape({
    authEmail: yup.string().email('Некорректный Email').required('Обязательное поле'),
  });
  const { cartStore, userStore, modalStore } = useAppStore()
  const { setDiscount } = cartStore.actions
  const { setAlert } = modalStore.actions
  const { setUserData } = userStore.actions
  const navigate = useNavigate()

  return (
    <div className={styles.auth_form}>
      <h2>АВТОРИЗАЦИЯ</h2>
      <p>Введите ваш Email и пароль, чтобы войти в аккаунт</p>
      <Formik
        initialValues={{
          authEmail: '',
          password: '',
        }}
        validateOnBlur
        validationSchema={formValidation}
        onSubmit={(values: AuthFormData) => authUser(values, navigate, { setAlert, setDiscount, setUserData })} >
        {({ values, handleChange, handleSubmit, errors, touched, handleBlur, isValid, dirty }) => (
          <Form>
            <label htmlFor="email">
              Email
              <Field
                type="email"
                name="authEmail"
                id="email"
                onChange={handleChange}
                value={values.authEmail}
                onBlur={handleBlur}
                placeholder="myawesomeemail@email.com"
                required
              />
              {touched.authEmail && errors.authEmail && (
                <p className={styles.error}>{errors.authEmail}</p>
              )}
            </label>
            <label htmlFor="password">
              Пароль
              <Field
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
                value={values.password}
                onBlur={handleBlur}
                placeholder="*******"
                required></Field>
            </label>
            <Link to={'../forgot-password'} className={styles.forgot_password}>
              Забыли пароль?
            </Link>
            <BigButton text={'Авторизоваться'} anyFunc={handleSubmit} isFormValid={isValid} />
          </Form>
        )}
      </Formik>
      <h3>
        или <Link to="../signup">зарегистрируйтесь</Link>
      </h3>
    </div>
  );
};

export default AuthForm;
