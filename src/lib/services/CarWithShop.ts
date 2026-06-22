import { Car } from '@/app/[locale]/models/Car';
import { RentalShop } from '@/app/[locale]/models/RentalShop';

export class CarWithShop {
  car: Car;
  shop: RentalShop;

  constructor(car: Car, shop: RentalShop) {
    this.car = car;
    this.shop = shop;
  }

  // =========================
  // BASE PRICE
  // =========================

  get basePrice(): number {
    return this.car.pricePerDay;
  }

  // =========================
  // DISCOUNT ACTIVE?
  // =========================

  get hasDiscount(): boolean {
    const d = this.shop.discount;

    if (!d) return false;

    if (!d.isActive) return false;

    const now = new Date();

    if (d.startAt && now < d.startAt) {
      return false;
    }

    if (d.endAt && now > d.endAt) {
      return false;
    }

    return true;
  }

  // =========================
  // FINAL PRICE
  // =========================

  get finalPrice(): number {
    if (!this.hasDiscount) {
      return this.basePrice;
    }

    const d = this.shop.discount!;

    if (d.type === 'percentage') {
      const discount = this.basePrice * (d.value / 100);

      return Math.max(this.basePrice - discount, 0);
    }

    if (d.type === 'fixed') {
      return Math.max(this.basePrice - d.value, 0);
    }

    return this.basePrice;
  }

  // =========================
  // DISCOUNT AMOUNT
  // =========================

  get discountAmount(): number {
    return this.basePrice - this.finalPrice;
  }

  // =========================
  // DISCOUNT %
  // =========================

  get discountPercent(): number {
    if (!this.hasDiscount) {
      return 0;
    }

    return (this.discountAmount / this.basePrice) * 100;
  }

  // =========================
  // DISPLAY LABEL
  // =========================

  get discountLabel(): string {
    if (!this.hasDiscount) {
      return '';
    }

    const d = this.shop.discount!;

    if (d.type === 'percentage') {
      return `-${Math.round(d.value)}%`;
    }

    return `-${Math.round(d.value)}`;
  }
}
