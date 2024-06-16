import { FIREBASE_DB } from '../../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { AssortmentItem } from './models/assortmentItem.interface';
import { AssortmentList } from '../../../models/assortment/assortmentList.interface';
import { Banners } from '../../../models';

export class AssortmentService {
  public get = createAsyncThunk<AssortmentItem[], string>('assortment/get', async (category) => {
    const assortRef = doc(FIREBASE_DB, `assortment/catalog`);
    return await getDoc<AssortmentList>(assortRef)
      .then((res) => {
        const data = res.get(category);
        return data as AssortmentItem[];
      })
      .catch((error) => {
        console.error('Ошибка при получении списка товаров', error);
        return [];
      });
  });

  public getSpecificsIcons = createAsyncThunk<string[]>(
    'assortment/getSpecificsIcons',
    async () => {
      const specificsRef = doc(FIREBASE_DB, 'assortment/specifics');
      return await getDoc<Record<string, string>>(specificsRef)
        .then((res) => {
          return Object.values(res.data() ?? {});
        })
        .catch((error) => {
          console.error('Ошибка при получении баннеров', error);
          return [];
        });
    },
  );
  public getBanners = createAsyncThunk<Banners>('assortment/getBanners', async () => {
    const bannersRef = doc(FIREBASE_DB, 'assortment/banners');
    return await getDoc<Banners>(bannersRef)
      .then((res) => {
        return (res.data() ?? {}) as Banners;
      })
      .catch((error) => {
        console.error('Ошибка при получении баннеров', error);
        return {} as Banners;
      });
  });
}
