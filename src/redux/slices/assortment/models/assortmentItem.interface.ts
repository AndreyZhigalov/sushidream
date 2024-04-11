export type AssortmentItem = {
  cartID?: string;
  id: number;
  title: string;
  dishPhoto: string;
  portion: number;
  price: number;
  contents: string;
  allergens: string;
  description: string;
  specifics: string[];
  count: number;
  category: string;
  subcategory?: string;
  rating: number;
};
