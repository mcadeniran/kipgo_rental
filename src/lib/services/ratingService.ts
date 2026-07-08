import { db } from '@/app/[locale]/firebase/config';
import { CreateRatingInput, Rating, ReviewPhoto } from '@/types/ratings';
import {
  collection,
  doc,
  runTransaction,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { uploadReviewPhotos } from './ratings/upload-review-photos';
import { updateVehicleAggregate } from './ratings/updateVehicleAggregate';
import { updateRentalAggregate } from './ratings/updateRentalAggregate';
import { deleteUploadedPhotos } from './ratings/deleteUploadedPhotos';
import {
  defaultRentalAggregate,
  defaultVehicleAggregate,
} from '../helper/defaultRating';

export async function createRating(input: CreateRatingInput): Promise<Rating> {
  const bookingRef = doc(db, 'bookings', input.bookingId);
  const carRef = doc(db, 'cars', input.carId);
  const shopRef = doc(db, 'rentalShops', input.shopId);
  const userRef = doc(db, 'profiles', input.userId);

  const ratingRef = doc(collection(db, 'carRatings'));

  const ratingId = ratingRef.id;

  let photos: ReviewPhoto[] = [];

  try {
    photos = await uploadReviewPhotos(ratingId, input.details.photos);

    await runTransaction(db, async (transaction) => {
      const userSnap = await transaction.get(userRef);

      if (!userSnap.exists()) {
        throw new Error('User not found');
      }

      const user = userSnap.data();

      const bookingSnap = await transaction.get(bookingRef);

      if (!bookingSnap.exists()) {
        throw new Error('Booking not found');
      }

      const booking = bookingSnap.data();

      if (booking.userId !== input.userId) {
        throw new Error('Unauthorized');
      }

      if (booking.status !== 'completed') {
        throw new Error('You can only review completed bookings.');
      }

      if (booking.isRated) {
        throw new Error('Booking already rated.');
      }

      const carSnap = await transaction.get(carRef);

      if (!carSnap.exists()) {
        throw new Error('Car not found.');
      }
      const shopSnap = await transaction.get(shopRef);

      if (!shopSnap.exists()) {
        throw new Error('Rental shop not found.');
      }

      const aggregate = carSnap.data().review ?? defaultVehicleAggregate;

      const shopAggregate = shopSnap.data().review ?? defaultRentalAggregate;

      const updatedAggregate = updateVehicleAggregate(
        aggregate,
        input.vehicle,
        input.details.wouldRecommend,
        'create',
      );

      const updatedShopAggregate = updateRentalAggregate(
        shopAggregate,
        input.rental,
        input.details.wouldRecommend,
        'create',
      );

      transaction.set(ratingRef, {
        id: ratingId,
        version: 1,
        bookingId: input.bookingId,
        createdBy: {
          id: input.userId,
          name: user.username,
          photoUrl: user.personal.photoUrl ?? null,
        },
        unitId: input.unitId,
        carId: input.carId,
        shopId: input.shopId,
        driverId: input.driverId,
        userId: input.userId,
        vehicle: input.vehicle,
        rental: input.rental,
        details: {
          ...input.details,
          photos,
        },
        createdAt: serverTimestamp(),
      });

      transaction.update(bookingRef, {
        isRated: true,
        ratingId,
        ratedAt: serverTimestamp(),
      });

      transaction.update(carRef, {
        review: updatedAggregate,
      });

      transaction.update(shopRef, {
        review: updatedShopAggregate,
      });
    });
  } catch (error) {
    if (photos.length > 0) {
      await deleteUploadedPhotos(photos.map((photo) => photo.path));
    }
    throw error;
  }

  const createdRating: Rating = {
    id: ratingId,
    version: 1,
    bookingId: input.bookingId,
    unitId: input.unitId,
    carId: input.carId,
    shopId: input.shopId,
    driverId: input.driverId,
    userId: input.userId,
    vehicle: input.vehicle,
    rental: input.rental,
    details: {
      ...input.details,
      photos,
    },
    createdBy: {
      id: input.userId,
      name: '',
      photoUrl: '',
    },
    createdAt: Timestamp.now(),
  };

  return createdRating;
}
