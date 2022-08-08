import React from 'react';
import { AuthForm, RegisterForm } from '../../componenst';

import styles from './Profile.module.scss';

const Profile: React.FC = () => {
  return (
    <div className={styles.profile_wrapper}>
      <AuthForm />
      <RegisterForm />
    </div>
  );
};
export default Profile;
