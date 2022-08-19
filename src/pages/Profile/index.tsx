import React from 'react';
import { Outlet } from 'react-router-dom';

import styles from './Profile.module.scss';

const Profile: React.FC = () => {
  return (
    <div className={styles.profile_wrapper}>
      <Outlet />
    </div>
  );
};
export default Profile;
