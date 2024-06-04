import { useState } from 'react';
import AuthEmailForm from '../../componenst/AuthEmailForm';
import { Link, useNavigate } from 'react-router-dom';
import AuthPhoneForm from '../../componenst/AuthPhoneForm';

import EmailIcon from '../../assets/icons/email.svg?react';
import GoogleIcon from '../../assets/icons/google.svg?react';
import PhoneIcon from '../../assets/icons/phone.svg?react';

import styles from './Signin.module.scss';
import { useUserActions } from '../../redux/slices/user/user.store';

enum AuthType {
  email = 'EMAIL',
  phone = 'PHONE',
  google = 'GOOGLE',
}

const Signin = () => {
  const [authType, setAuthType] = useState<AuthType>(AuthType.email);
  const { authUserWithGoogle } = useUserActions();
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      {authType === AuthType.email && <AuthEmailForm />}
      {authType === AuthType.phone && <AuthPhoneForm hasRedirect={true} />}
      <div className={styles.auth_methods}>
        <div>Войти через:</div>
        <EmailIcon onClick={() => setAuthType(AuthType.email)} className={styles.icon} />
        <PhoneIcon onClick={() => setAuthType(AuthType.phone)} className={styles.icon} />
        <GoogleIcon
          className={styles.icon}
          onClick={() => authUserWithGoogle().then(() => navigate('/profile'))}
        />
      </div>
      <div className={styles.hint}>
        или <Link to="../signup" className={styles.link}>зарегистрируйтесь</Link>
      </div>
    </div>
  );
};

export default Signin;
