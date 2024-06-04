import ForgotPasswordForm from '../../componenst/ForgotPasswordForm';
import styles from './Signup.module.scss';

const ForgotPassword = () => {
  return (
    <div className={styles.wrapper}>
      <ForgotPasswordForm />
    </div>
  );
};

export default ForgotPassword;
