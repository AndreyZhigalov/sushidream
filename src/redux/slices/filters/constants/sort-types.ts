import { SortItem } from "../../../../models";


export const SORT_TYPES: SortItem[] = [
  {
    name: 'названию',
    value: 'title',
  },
  {
    name: 'цене по возрастанию',
    value: 'price+',
  },
  {
    name: 'цене по убыванию',
    value: 'price',
  },
  {
    name: 'популярности',
    value: 'rating',
  },
  {
    name: 'цене за штуку',
    value: 'cheapest',
  },
];
