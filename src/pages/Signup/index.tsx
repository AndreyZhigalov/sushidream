import RegisterForm from '../../componenst/RegisterForm';
import styles from './Signup.module.scss';
type Props = {};

const Signup = (props: Props) => {
  return (
    <div className={styles.wrapper}>
      <RegisterForm />
    </div>
  );
};

export default Signup;
