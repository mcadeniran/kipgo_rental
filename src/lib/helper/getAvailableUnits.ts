import { Booking } from '@/app/[locale]/models/Booking';
import { Car } from '@/app/[locale]/models/Car';

export function getAvailableUnits(
  car: Car,
  bookings: Booking[],
  pickup: Date,
  dropoff: Date,
) {
  const overlaps = bookings.filter((b) => {
    return pickup < b.dropoffDate && dropoff > b.pickupDate;
  });

  return car.availableUnits - overlaps.length;
}
