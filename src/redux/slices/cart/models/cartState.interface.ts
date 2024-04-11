
import { FetchStatus } from '../../../../models';
import { AssortmentItem } from '../../assortment';

export interface CartState {
  cartItems: AssortmentItem[];
  count: number;
  discount: number;
  totalPrice: number;
  cartStatus: FetchStatus;
}
