import { assortmentSlice } from './assortment.slice';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { FetchData } from './models/assortmentFetchData.interface';
import { AssortmentService } from './assortment.service';
import { useAppDispatch } from '../../../Hooks/hooks';

export const useAssortmentActions = () => {
  const dispatch = useAppDispatch()
  const { setAssortment, sortItems, findItem } = assortmentSlice.actions;
  const service = new AssortmentService()
  return {
    setAssortment: (fetchData: FetchData) => dispatch(setAssortment(fetchData)),
    sortItems: (sortType: string) => dispatch(sortItems(sortType)),
    findItem: (id: number) => dispatch(findItem(id)),
    getAll: (categoryName: string) => dispatch(service.getAll(categoryName)),
    getByCategory: (category: string) => dispatch(service.getByCategory(category)),
  };
};

export const useAssortmentGetters = () => useSelector((state: RootState) => state.assortment)

