import { AssortmentItem } from '../redux/slices/assortment';

export const setSpecials = (item: AssortmentItem | undefined | null, specials: string[]) => {
  if (!item) return;
  if (item?.specifics[0]) {
    return specials.map((icon: string) => {
      return item?.specifics.find((link: string) =>
        icon.toLowerCase().includes(link.toLowerCase()),
      ) ? (
        <img key={icon} src={icon} alt="Особенность" />
      ) : null;
    });
  }
};
