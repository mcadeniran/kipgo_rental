import { Timestamp } from 'firebase/firestore';

export interface ReviewPhoto {
  id: string;
  url: string;
  path: string;
  uploadedAt: Date;
}

export interface VehicleRating {
  overall: number;
  cleanliness: number;
  comfort: number;
  condition: number;
  valueForMoney: number;
}

export interface RentalRating {
  overall: number;
  communication: number;
  pickupExperience: number;
  returnExperience: number;
  professionalism: number;
}

export interface ReviewDetailsInput {
  title: string;
  review: string;
  pros: string[];
  cons: string[];
  photos: File[];
  wouldRecommend: boolean;
  wouldRentAgain: boolean;
  isAnonymous: boolean;
}

export interface ReviewDetails {
  title: string;
  review: string;
  pros: string[];
  cons: string[];
  photos: ReviewPhoto[];
  wouldRecommend: boolean;
  wouldRentAgain: boolean;
  isAnonymous: boolean;
}

export interface Rating {
  id: string;
  version: 1;
  bookingId: string;
  carId: string;
  shopId: string;
  userId: string;
  unitId: string;
  driverId?: string;
  vehicle: VehicleRating;
  rental: RentalRating;
  details: ReviewDetails;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
}

export interface VehicleRatingAggregate {
  totalReviews: number;
  recommendationCount: number;
  overallTotal: number;
  cleanlinessTotal: number;
  comfortTotal: number;
  conditionTotal: number;
  valueForMoneyTotal: number;
  average: number;
  recommendationRate: number;
  overall: number;
  cleanliness: number;
  comfort: number;
  condition: number;
  valueForMoney: number;
}

export interface RentalRatingAggregate {
  totalReviews: number;
  recommendationCount: number;
  overallTotal: number;
  communicationTotal: number;
  pickupExperienceTotal: number;
  returnExperienceTotal: number;
  professionalismTotal: number;
  average: number;
  recommendationRate: number;
  overall: number;
  communication: number;
  pickupExperience: number;
  returnExperience: number;
  professionalism: number;
}

export interface CreateRatingInput {
  bookingId: string;
  carId: string;
  shopId: string;
  unitId: string;
  userId: string;
  driverId?: string;
  vehicle: VehicleRating;
  rental: RentalRating;
  details: ReviewDetailsInput;
}
