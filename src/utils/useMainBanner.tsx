import { FetchStatus } from '../models';
import { useAssortmentGetters } from '../redux/slices/assortment';
import { useFiltersGetters } from '../redux/slices/filters';
import bannerLoader from '../assets/banner_loader.webp';

export const useMainBanner = (): [string, string, string] => {
  const { banners, status } = useAssortmentGetters();
  const { currentCategory } = useFiltersGetters();

  const banner = banners?.[currentCategory.value];
  if (status === FetchStatus.LOADING) {
    return [bannerLoader, bannerLoader, bannerLoader];
  } else {
    return [`${banner?.['1600']} 1600w`, `${banner?.['820']} 820w`, `${banner?.['420']} 420w`].map(
      (value) => value ?? bannerLoader,
    ) as [string, string, string];
  }
};
