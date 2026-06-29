import { Booking } from '@/app/[locale]/models/Booking';
import { CarUnit } from '@/app/[locale]/models/CarUnit';
import { isWithinInterval } from 'date-fns';

export function getAvailableUnitsForDate(
  date: Date,
  units: CarUnit[],
  bookings: Booking[],
) {
  const bookedUnitIds = bookings
    .filter((booking) =>
      isWithinInterval(date, {
        start: new Date(booking.pickupDate),
        end: new Date(booking.dropoffDate),
      }),
    )
    .map((booking) => booking.unitId);

  return units.filter((unit) => !bookedUnitIds.includes(unit.id));
}
