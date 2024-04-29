import { FIREBASE_DB } from '../../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchData } from './models/assortmentFetchData.interface';
import { cartSlice } from '../cart';
import { AssortmentItem } from './models/assortmentItem.interface';
import { AssortmentList } from '../../../models/assortment/assortmentList.interface';
import { Banners } from '../../../models';

export class AssortmentService {
    public getAll = createAsyncThunk<FetchData, string>(
        'assortment/getAll',
        async (categoryName, Thunk) => {
            const assortRef = doc(FIREBASE_DB, 'assortment/catalog');
            const bannersRef = doc(FIREBASE_DB, 'assortment/banners');
            const specificsRef = doc(FIREBASE_DB, 'assortment/specifics');
            try {
                const [assortment, banners, specifics] = await Promise.all([
                    getDoc<AssortmentList>(assortRef),
                    getDoc<Banners>(bannersRef),
                    getDoc<Record<string, string>>(specificsRef)
                ])
                Thunk.dispatch(cartSlice.actions.fetchCart())
                return [
                    assortment.data()?.[categoryName] ?? [],
                    banners.data() ?? {},
                    Object.values(specifics.data() ?? {}),
                ] as FetchData;

            } catch (error) {
                console.error('Ошибка при получении списка товаров')
            }
            return [[], {}, []]
        },
    );
    public getByCategory = createAsyncThunk<AssortmentItem[], string>("assortment/getByCategory", async (category, Thunk) => {
        const assortRef = doc(FIREBASE_DB, `assortment/catalog`);
        return await getDoc<AssortmentList>(assortRef)
            .then((res) => {
                const data = res.get(category)
                return data as AssortmentItem[]
            }).catch(error => {
                console.error('Ошибка при получении списка товаров');
                throw new Error(error)
            })
    })
}
