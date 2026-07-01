import { RatingFormValues } from '@/schemas';
import { RentalRatingAggregate, VehicleRatingAggregate } from '@/types/ratings';

export const defaultVehicleAggregate: VehicleRatingAggregate = {
  totalReviews: 0,
  recommendationCount: 0,
  overallTotal: 0,
  cleanlinessTotal: 0,
  comfortTotal: 0,
  conditionTotal: 0,
  valueForMoneyTotal: 0,
  average: 0,
  recommendationRate: 0,
  overall: 0,
  cleanliness: 0,
  comfort: 0,
  condition: 0,
  valueForMoney: 0,
};

export const defaultRentalAggregate: RentalRatingAggregate = {
  totalReviews: 0,
  recommendationCount: 0,
  overallTotal: 0,
  communicationTotal: 0,
  pickupExperienceTotal: 0,
  returnExperienceTotal: 0,
  professionalismTotal: 0,
  average: 0,
  recommendationRate: 0,
  overall: 0,
  communication: 0,
  pickupExperience: 0,
  returnExperience: 0,
  professionalism: 0,
};

export const defaultRatingValues: RatingFormValues = {
  vehicle: {
    overall: 0,
    cleanliness: 0,
    comfort: 0,
    condition: 0,
    valueForMoney: 0,
  },

  rental: {
    overall: 0,
    communication: 0,
    pickupExperience: 0,
    returnExperience: 0,
    professionalism: 0,
  },

  details: {
    title: '',
    review: '',
    pros: [],
    cons: [],
    photos: [],
    wouldRecommend: true,
    wouldRentAgain: true,
    isAnonymous: false,
  },
};
