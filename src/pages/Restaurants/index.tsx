import { doc, getDoc, limit } from 'firebase/firestore';
import React, { useState } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import { firestoreDB } from '../../firebase';
import { setAlert } from '../../redux/slices/modalWindowSlice';
import { useAppDispatch } from '../../Hooks/hooks';

import star from '../../assets/icons/star.svg';

import styles from './Restaurants.module.scss';
import LoadingRestaurant from '../../componenst/LoadingRestaurant';

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
  const dispatch = useAppDispatch();
  const [restaurants, setRestaurants] = useState<Restaurant[]>();
  const [coordinates, setCoordinates] = useState<number[]>([]);
  const zoom = 17;

  React.useEffect(() => {
    getDoc(doc(firestoreDB, 'restaurants', 'addresses'))
      .then((res) => {
        const rests = Object.values(res.data() as FetchedRestuarants);
        setCoordinates(rests[0].coordinate);
        setRestaurants(rests);
      })
      .catch((error) => {
        dispatch(setAlert('Не удалось получить список ресторанов'));
        throw new Error(error);
      });
  }, []);

  return (
    <div className={styles.restaurants}>
      <ul className={styles.addressies}>
        {!restaurants
          ? Array(4)
              .fill(1)
              .map((item) => (
                <li>
                  <LoadingRestaurant />
                </li>
              ))
          : restaurants.map((rest) => (
              <li
                key={rest.coordinate[0]}
                className={styles.address_card}
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
            <Placemark geometry={coordinates} />
          </Map>
        </YMaps>
      )}
    </div>
  );
};
export default Restaurants;
