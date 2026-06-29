import { Booking } from '@/app/[locale]/models/Booking';
import { CarUnit } from '@/app/[locale]/models/CarUnit';
import { eachDayOfInterval } from 'date-fns';

export function hasAvailableUnitForRange(
  start: Date,
  end: Date,
  units: CarUnit[],
  bookings: Booking[],
) {
  const days = eachDayOfInterval({
    start,
    end,
  });

  for (const unit of units) {
    const availableEveryDay = days.every((day) => {
      const booked = bookings.some(
        (booking) =>
          booking.unitId === unit.id &&
          day >= new Date(booking.pickupDate) &&
          day <= new Date(booking.dropoffDate),
      );

      return !booked;
    });

    if (availableEveryDay) {
      return true;
    }
  }

  return false;
}
