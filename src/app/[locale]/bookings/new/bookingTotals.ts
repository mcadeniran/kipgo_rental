// utils/bookingTotals.ts

import { differenceInCalendarDays } from 'date-fns';
import { BookingDraft } from './BookingDraft';
import { CarWithShop } from '@/lib/services/CarWithShop';

export interface BookingTotals {
  rentalDays: number;

  rentalPrice: number;

  deliveryPrice: number;

  deposit: number;

  preTax: number;

  tax: number;

  total: number;

  dailyPrice: number;

  currency: string;
}

export function calculateBookingTotals(
  draft: BookingDraft,
  carShop: CarWithShop,
): BookingTotals {
  const rentalDays = differenceInCalendarDays(
    draft.dropoffDate!,
    draft.pickupDate!,
  );

  const dailyPrice = carShop.finalPrice;

  const rentalPrice = rentalDays * carShop.finalPrice;

  const deliveryPrice =
    draft.deliveryType === 'delivery' ? (carShop.car.deliveryPrice ?? 0) : 0;

  const deposit = carShop.car.deposit;

  const preTax = rentalPrice + deliveryPrice;

  const tax = preTax * carShop.shop.taxRate;

  const total = preTax + tax + deposit;

  const currency = carShop.car.currency ?? carShop.shop.currency ?? 'TRY';

  return {
    rentalDays,
    rentalPrice,
    deliveryPrice,
    deposit,
    preTax,
    tax,
    total,
    currency,
    dailyPrice,
  };
}
