import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import { FIREBASE_DB } from '../../firebase';
import classNames from 'classnames';
import LoadingRestaurant from '../../componenst/LoadingRestaurant';

import star from '../../assets/icons/star.svg';
import logo from '../../assets/logo-primary.svg';

import styles from './Restaurants.module.scss';
interface Restaurant {
  id: number;
  street: string;
  city: string;
  coordinate: number[];
  title: string;
  rating: 4.8;
  workingTime: string[];
}

interface FetchedRestuarants {
  [key: string]: Restaurant;
}

const Restaurants: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>();
  const [coordinates, setCoordinates] = useState<number[]>([]);
  const zoom = 17;

  useEffect(() => {
    getDoc(doc(FIREBASE_DB, 'restaurants', 'addresses'))
      .then((res) => {
        const rests = Object.values(res.data() as FetchedRestuarants);
        setCoordinates(rests[0].coordinate);
        setRestaurants(rests);
      })
      .catch((error) => {
        console.error('Не удалось получить список ресторанов');
        throw new Error(error);
      });
  }, []);

  return (
    <div className={styles.restaurants}>
      <ul className={styles.addressies}>
        {!restaurants
          ? Array(4)
              .fill(1)
              .map(() => (
                <li className={styles.address_card}>
                  <LoadingRestaurant />
                </li>
              ))
          : restaurants.map((rest) => (
              <li
                key={rest.coordinate[0]}
                className={classNames(styles.address_card, {
                  [styles.active]: coordinates[0] === rest.coordinate[0],
                })}
                onClick={() => setCoordinates(rest.coordinate ?? [])}>
                <h3 className={styles.title}>{rest.title}</h3>
                <p className={styles.address}>Адрес: {`${rest.street}, ${rest.city}`}</p>
                <span className={styles.rating}>
                  <img src={star} alt="" />
                  <div>{rest.rating}</div>
                </span>
                <span className={styles.workingTime}>
                  {`с ${rest.workingTime[0]} до ${rest.workingTime[1]}`}
                </span>
              </li>
            ))}
      </ul>
      {coordinates[0] && (
        <YMaps>
          <Map
            className={styles.map_wrapper}
            defaultState={{ center: [0, 0], zoom }}
            state={{ center: coordinates, zoom }}>
            {restaurants?.map(({ id, coordinate }) => (
              <Placemark
                key={id}
                geometry={coordinate}
                options={{
                  iconImageHref: logo,
                  iconLayout: 'default#image',
                  iconImageSize: [50, 50],
                  iconImageOffset: [-25, -25],
                }}
              />
            ))}
          </Map>
        </YMaps>
      )}
    </div>
  );
};
export default Restaurants;
