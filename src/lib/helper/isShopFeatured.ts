import { RentalShop } from '@/app/[locale]/models/RentalShop';

export const isShopFeatured = ({ shop }: { shop: RentalShop }) => {
  const now = new Date();

  if (!shop.isFeatured || shop.featured === null) return false;

  const start = shop.featured!.startAt;
  const end = shop.featured!.endAt;

  if (shop.isFeatured) {
    if (now > start && now < end) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
