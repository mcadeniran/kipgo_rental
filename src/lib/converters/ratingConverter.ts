import { Rating } from '@/types/ratings';
import { FirestoreDataConverter } from 'firebase/firestore';

export const ratingConverter: FirestoreDataConverter<Rating> = {
  toFirestore(rating) {
    return {
      ...rating,
    };
  },

  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      version: data.version,
      bookingId: data.bookingId,
      carId: data.carId,
      shopId: data.shopId,
      userId: data.userId,
      unitId: data.unitId,
      driverId: data.driverId ?? null,
      vehicle: data.vehicleRating,
      rental: data.rentalRating,
      details: data.details,
      // review: data.review,
      // pros: data.pros ?? [],
      // cons: data.cons ?? [],
      // photos: data.reviewPhoto ?? [],
      // wouldRecommend: data.wouldRecommend ?? true,
      // wouldRentAgain: data.wouldRentAgain ?? true,
      // isAnonymous: data.isAnonymous ?? false,
      // status: data.status ?? 'approved',
      // createdAt: parseTimestamp(data.createdAt)!,
      // updatedAt: parseTimestamp(data.updatedAt),
      createdAt: data.createdAt,
      updatedAt: data.updatedAt ?? null,
      createdBy: {
        id: data.createdBy.id ?? '',
        name: data.createdBy.name ?? '',
        photoUrl: data.createdBy.photoUrl,
      },
    };
  },
};

// const parseTimestamp = (value: Timestamp | Date): Date | undefined => {
//   if (!value) return undefined;

//   if (value instanceof Timestamp) {
//     return value.toDate();
//   }

//   if (value instanceof Date) {
//     return value;
//   }

//   return undefined;
// };
