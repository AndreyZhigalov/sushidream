import React, { ComponentPropsWithRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import deliveryBoy from '../../../assets/icons/deliveryBoy.svg';
import { FetchStatus } from '../../../models';
import GetPhone from '../../Modal/GetPhone';
import styles from './OrderButton.module.scss';
import { useOrderActions, useOrderGetters } from '../../../redux/slices/order';
import { useUserGetters } from '../../../redux/slices/user/user.store';
import { useDeliveryGetters } from '../../../redux/slices/delivery';
import classNames from 'classnames';
import { BigButton } from '../../BigButton';

export const OrderButton: React.FC<ComponentPropsWithRef<'button'>> = ({ className, ...props }) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const { phoneNumber } = useUserGetters();
  const { getOrder } = useOrderActions();
  const { status } = useOrderGetters();
  const { currentRegion } = useDeliveryGetters();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const onClickOrder = pathname.includes('cart')
    ? () => {
        if (phoneNumber) {
          getOrder();
          setShowModal(false);
        } else {
          setShowModal(true);
        }
      }
    : () => navigate('cart');

  return (
    <>
      <GetPhone open={showModal} onClose={() => setShowModal(false)} handler={onClickOrder} />
      <BigButton
        className={classNames(styles.button, className)}
        isLoading={status === FetchStatus.LOADING}
        onClick={onClickOrder}
        {...props}>
        {currentRegion === 'Самовывоз' ? 'Оформить заказ' : 'Оформить доставку'}
        <img
          className={classNames(styles.button_icon, {
            [styles.hide]: currentRegion === 'Самовывоз',
          })}
          height={30}
          src={deliveryBoy}
          alt="deliveryBoy"
        />
      </BigButton>
    </>
  );
};
