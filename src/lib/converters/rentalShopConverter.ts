import { FirestoreDataConverter, Timestamp } from 'firebase/firestore';
import { RentalShop } from '@/app/[locale]/models/RentalShop';
import { GeoPoint } from 'firebase/firestore';

export const rentalShopConverter: FirestoreDataConverter<RentalShop> = {
  toFirestore(rental: RentalShop) {
    return {
      ...rental,
      location: rental.location
        ? new GeoPoint(rental.location.lat, rental.location.lng)
        : null,
      createdAt: rental.createdAt,
    };
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      name: data.name,
      email: data.email,
      role: data.role,
      isActive: data.isActive,
      bannerUrl: data.bannerUrl,
      logoUrl: data.logoUrl,
      phone: data.phone,
      address: data.address,
      description: data.description,
      city: data.city,
      district: data.district,
      offersDelivery: data.offersDelivery,
      rating: data.rating ?? 0,
      isFeatured: data.isFeatured ?? false,
      currency: data.currency ?? 'TRY',
      commissionPercentage: data.commissionPercentage ?? 0,
      taxRate: data.taxRate ?? 0,
      totalRatings: data.totalRatings ?? 0,
      featured: data.featured
        ? {
            startAt:
              data.featured?.startAt instanceof Timestamp
                ? data.featured.startAt.toDate()
                : data.featured?.startAt,
            endAt:
              data.featured?.endAt instanceof Timestamp
                ? data.featured.endAt.toDate()
                : data.featured?.endAt,
          }
        : undefined,
      discount: data.discount
        ? {
            type: data.discount.type,
            value: data.discount.value,
            isActive: data.discount.isActive,
            startAt:
              data.discount?.startAt instanceof Timestamp
                ? data.discount.startAt.toDate()
                : data.discount?.startAt,
            endAt:
              data.discount?.endAt instanceof Timestamp
                ? data.discount.endAt.toDate()
                : data.discount?.endAt,
          }
        : undefined,
      location: data.location
        ? {
            lat: data.location.lat,
            lng: data.location.lng,
          }
        : undefined,

      review: data.review
        ? {
            average: data.review.average,
            communication: data.review.communication,
            communicationTotal: data.review.communicationTotal,
            overall: data.review.overall,
            overallTotal: data.review.overallTotal,
            pickupExperience: data.review.pickupExperience,
            pickupExperienceTotal: data.review.pickupExperienceTotal,
            professionalism: data.review.professionalism,
            professionalismTotal: data.review.professionalismTotal,
            recommendationCount: data.review.recommendationCount,
            recommendationRate: data.review.recommendationRate,
            returnExperience: data.review.returnExperience,
            returnExperienceTotal: data.review.returnExperienceTotal,
            totalReviews: data.review.totalReviews,
            distribution: {
              one: data.review.distribution.one,
              two: data.review.distribution.two,
              three: data.review.distribution.three,
              four: data.review.distribution.four,
              five: data.review.distribution.five,
            },
          }
        : undefined,

      createdAt:
        data.createdAt instanceof Timestamp
          ? data.createdAt.toDate()
          : data.createdAt,

      rules: {
        securityDeposit: data.rules?.securityDeposit || '',
        fuelPolicy: data.rules?.fuelPolicy || '',
        mileageLimit: data.rules?.mileageLimit || '',
        insurance: data.rules?.insurance || '',
        lateReturn: data.rules?.lateReturn || '',
        cancellation: data.rules?.cancellation || '',
      },
    };
  },
};
