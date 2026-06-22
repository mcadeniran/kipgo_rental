import { Car } from '@/app/[locale]/models/Car';
import { RentalShop } from '@/app/[locale]/models/RentalShop';
import { CarWithShop } from './CarWithShop';

export function buildCarsWithShop(
  cars: Car[],
  shops: RentalShop[],
): CarWithShop[] {
  const shopMap = new Map(shops.map((shop) => [shop.id, shop]));
  return cars
    .map((car) => {
      const shop = shopMap.get(car.shopId);

      if (!shop) {
        return null;
      }

      if (!shop.isActive) {
        return null;
      }

      if (!car.isVisible) {
        return null;
      }

      // if (car.isApproved === false) {
      //   return null;
      // }

      return new CarWithShop(car, shop);
    })
    .filter((item): item is CarWithShop => item !== null);
}
