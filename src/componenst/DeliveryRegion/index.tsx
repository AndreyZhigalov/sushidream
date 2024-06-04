import { FC, useEffect, useRef, useState } from 'react';
import { FetchStatus } from '../../models';
import { useAppStore } from '../../redux/store';

import styles from './DeliveryRegion.module.scss';
import classNames from 'classnames';

export const DeliveryRegion: FC = () => {
  const [visibility, setVisibility] = useState(false);
  const { orderStore, deliveryStore } = useAppStore();
  const { regions, currentRegion } = deliveryStore.getters;
  const { setDeliveryCost } = deliveryStore.actions;
  const { status } = orderStore.getters;
  const { setOrderStatus } = orderStore.actions;
  const deliveryRef = useRef<HTMLDivElement>(null);

  const deliveryRegionCost = (i: number) => {
    setVisibility(false);
    setDeliveryCost(i);
    if (status === FetchStatus.SUCCESS) {
      setOrderStatus(FetchStatus.WAITING);
    }
  };

  useEffect(() => {
    const handleClickDelivery = (event: MouseEvent) => {
      if (deliveryRef.current && !event.composedPath().includes(deliveryRef.current))
        setVisibility(false);
    };
    document.body.addEventListener('click', handleClickDelivery);
    return () => document.body.removeEventListener('click', handleClickDelivery);
  }, []);

  return (
    <div className={styles.wrapper} ref={deliveryRef}>
      <div onClick={() => setVisibility(true)} className={styles.region}>
        <address className={styles.address}>{currentRegion || 'ВЫБЕРИТЕ РЕСТОРАН ДОСТАВКИ'}</address>
        <svg
          className={styles.chevrone}
          width="15"
          height="10"
          viewBox={'0 0 30 21'}
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M2.5 19L15 4L27.5 19" stroke="white" strokeWidth="4" strokeLinecap="round" />
        </svg>
      </div>
      <ul className={classNames(styles.list, { [styles.hide]: !visibility })}>
        {regions.map((type, i: number) => (
          <li
            onClick={() => deliveryRegionCost(i)}
            className={`${styles.option} ${currentRegion === type ? styles.active : ''}`}
            key={i}>
            {type}
          </li>
        ))}
      </ul>
    </div>
  );
};
