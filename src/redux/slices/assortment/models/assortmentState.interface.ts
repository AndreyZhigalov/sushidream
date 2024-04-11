import { Banners, FetchStatus } from '../../../../models';
import { AssortmentItem } from './assortmentItem.interface';

export interface AssortmentState {
  items: AssortmentItem[];
  banners: Banners;
  specials: string[];
  searchedItem?: AssortmentItem | null;
  status: FetchStatus;
}
