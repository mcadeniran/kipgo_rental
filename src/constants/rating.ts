import { RatingFormValues } from '@/schemas';

export const VEHICLE_RATING_FIELDS = [
  'overall',
  'cleanliness',
  'comfort',
  'condition',
  'valueForMoney',
] as const;

export const RENTAL_RATING_FIELDS = [
  'overall',
  'communication',
  'pickupExperience',
  'returnExperience',
  'professionalism',
] as const;

export const REVIEW_TITLE_MIN_LENGTH = 5;

export const REVIEW_TITLE_MAX_LENGTH = 120;

export const MAX_REVIEW_IMAGES = 6;

export const MIN_REVIEW_LENGTH = 20;

export const MAX_REVIEW_LENGTH = 1500;

export const MAX_PROS = 5;

export const MAX_CONS = 5;

export const MAX_TAG_LENGTH = 60;

export const VEHICLE_RATING_ITEMS = [
  {
    name: 'overall',
    label: 'Overall Experience',
    description: 'How would you rate the vehicle overall?',
  },
  {
    name: 'cleanliness',
    label: 'Cleanliness',
    description: 'Was the vehicle clean and well maintained?',
  },
  {
    name: 'comfort',
    label: 'Comfort',
    description: 'How comfortable was the vehicle during the trip?',
  },
  {
    name: 'condition',
    label: 'Vehicle Condition',
    description:
      'Did the vehicle match the listing and arrive in good condition?',
  },
  {
    name: 'valueForMoney',
    label: 'Value for Money',
    description: 'Did the vehicle provide good value for the amount paid?',
  },
] as const;

export const RENTAL_RATING_ITEMS = [
  {
    name: 'overall',
    label: 'Overall Experience',
    description: 'Overall experience with the rental company.',
  },
  {
    name: 'communication',
    label: 'Communication',
    description: 'How responsive and helpful was the rental company?',
  },
  {
    name: 'pickupExperience',
    label: 'Pickup Experience',
    description: 'How smooth was the pickup process?',
  },
  {
    name: 'returnExperience',
    label: 'Return Experience',
    description: 'How easy was the vehicle return process?',
  },
  {
    name: 'professionalism',
    label: 'Professionalism',
    description: 'How professional was the rental company?',
  },
] as const;

export const ratingDefaultValues: RatingFormValues = {
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
