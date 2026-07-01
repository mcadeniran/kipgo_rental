import { CreateRatingInput, Rating } from '@/types/ratings';
import { getBookingById } from '../services/bookingService';
import { SubmitRatingInput } from './useSubmitRating';
import { createRating } from '../services/ratingService';

export async function submitRating(input: SubmitRatingInput): Promise<Rating> {
  const booking = await getBookingById(input.bookingId);

  if (!booking) {
    throw new Error('Booking not found.');
  }

  const createInput: CreateRatingInput = {
    bookingId: booking.id,
    userId: booking.userId,
    carId: booking.carId,
    unitId: booking.unitId ?? '',
    shopId: booking.shopId,
    driverId: booking.driverId,
    vehicle: input.rating.vehicle,
    rental: input.rating.rental,
    details: input.rating.details,
  };

  return createRating(createInput);
}
