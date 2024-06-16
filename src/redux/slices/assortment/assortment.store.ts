import { assortmentSlice } from './assortment.slice';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { FetchData } from './models/assortmentFetchData.interface';
import { AssortmentService } from './assortment.service';
import { useAppDispatch } from '../../../Hooks/hooks';

export const useAssortmentActions = () => {
  const dispatch = useAppDispatch();
  const { setAssortment, sortItems, findItem } = assortmentSlice.actions;
  const service = new AssortmentService();
  return {
    setAssortment: (fetchData: FetchData) => dispatch(setAssortment(fetchData)),
    sortItems: (sortType: string) => dispatch(sortItems(sortType)),
    findItem: (id: number) => dispatch(findItem(id)),
    get: (category: string) => dispatch(service.get(category)),
    getSpecificsIcons: () => dispatch(service.getSpecificsIcons()),
    getBanners: () => dispatch(service.getBanners()),
  };
};

export const useAssortmentGetters = () => useSelector((state: RootState) => state.assortment);
