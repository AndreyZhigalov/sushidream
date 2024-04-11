import { AssortmentItem } from '../../assortment';

export interface OrderItem {
  orderID: string;
  items: AssortmentItem[];
  address: string;
  deliveryCost: number;
  discount: number;
  TotalCost: number;
}
