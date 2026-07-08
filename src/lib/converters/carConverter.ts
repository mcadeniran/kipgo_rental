import {
  FirestoreDataConverter,
  Timestamp,
  GeoPoint,
} from 'firebase/firestore';
import { Car } from '@/app/[locale]/models/Car';

export const carConverter: FirestoreDataConverter<Car> = {
  toFirestore(car: Car) {
    return {
      ...car,

      location: car.location
        ? new GeoPoint(car.location.lat, car.location.lng)
        : null,

      createdAt: car.createdAt,
    };
  },

  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);

    return {
      id: snapshot.id,

      shopId: data.shopId,

      brand: data.brand,
      model: data.model,

      year: data.year,

      transmission: data.transmission,
      fuel: data.fuel,

      seats: data.seats,

      carType: data.carType,

      deposit: data.deposit,

      currency: data.currency || 'TRY',

      features: data.features || [],

      pricePerDay: data.pricePerDay,

      images: data.images || [],

      city: data.city,
      district: data.district,
      address: data.address,

      location: data.location
        ? {
            lat: data.location.lat,
            lng: data.location.lng,
          }
        : undefined,

      offersDelivery: data.offersDelivery,
      deliveryPrice: data.deliveryPrice,

      totalUnits: data.totalUnits,
      availableUnits: data.availableUnits,

      isVisible: data.isVisible ?? true,

      isFeatured: data.isFeatured ?? false,

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

      isApproved: data.isApproved ?? false,

      createdAt:
        data.createdAt instanceof Timestamp
          ? data.createdAt.toDate()
          : data.createdAt,

      rating: data.rating ?? 0,
      totalRatings: data.totalRatings ?? 0,

      review: data.review
        ? {
            average: data.review.average,
            cleanliness: data.review.cleanliness,
            cleanlinessTotal: data.review.cleanlinessTotal,
            comfort: data.review.comfort,
            comfortTotal: data.review.comfortTotal,
            condition: data.review.condition,
            conditionTotal: data.review.conditionTotal,
            overall: data.review.overall,
            overallTotal: data.review.overallTotal,
            recommendationCount: data.review.recommendationCount,
            recommendationRate: data.review.recommendationRate,
            totalReviews: data.review.totalReviews,
            valueForMoney: data.review.valueForMoney,
            valueForMoneyTotal: data.review.valueForMoneyTotal,
            distribution: {
              one: data.review.distribution.one,
              two: data.review.distribution.two,
              three: data.review.distribution.three,
              four: data.review.distribution.four,
              five: data.review.distribution.five,
            },
          }
        : undefined,

      shop: data.shop
        ? {
            name: data.shop.name,
            rating: data.shop.rating,
            logo: data.shop.logo,
            rules: {
              securityDeposit: data.shop.rules.securityDeposit,
              fuelPolicy: data.shop.rules.fuelPolicy,
              mileageLimit: data.shop.rules.mileageLimit,
              insurance: data.shop.rules.insurance,
              lateReturn: data.shop.rules.lateReturn,
              cancellation: data.shop.rules.cancellation,
            },
            email: data.shop.email,
            phone: data.shop.phone,
          }
        : undefined,
    };
  },
};
