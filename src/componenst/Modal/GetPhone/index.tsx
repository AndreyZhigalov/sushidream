import { Link } from 'react-router-dom';
import { Modal } from '..';

import styles from './GetPhone.module.scss';
import AuthPhoneForm from '../../AuthPhoneForm';
import { ROUTES } from '../../../constants/routes';

type GetPhoneModalProps = { open: boolean; handler?: () => unknown; onClose?: () => unknown };

const GetPhone = ({ open, handler, onClose }: GetPhoneModalProps) => {
  return (
    <Modal
      open={open}
      header={'Чтобы сделать заказ, добавьте телефон'}
      style={{ maxWidth: 500 }}
      onClose={onClose}>
      <div className={styles.wrapper}>
        <AuthPhoneForm handler={handler} hasRedirect={false} />
        <p>
          <span style={{ marginRight: 10 }}>Либо</span>
          <Link to={`${ROUTES.base}${ROUTES.signup}`} onClick={onClose}>
            зарегистрируйтесь
          </Link>
        </p>
      </div>
    </Modal>
  );
};

export default GetPhone;
