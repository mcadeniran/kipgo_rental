import { RatingFormValues } from '@/schemas';
import { Translator } from '@/schemas/create-schema';

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

export const VEHICLE_RATING_ITEMS = (t: Translator) =>
  [
    {
      name: 'overall',
      label: t('bookings.ratings.overallExperience'),
      description: t('bookings.ratings.overallExperienceNote'),
    },
    {
      name: 'cleanliness',
      label: t('bookings.ratings.cleanliness'),
      description: t('bookings.ratings.cleanlinessNote'),
    },
    {
      name: 'comfort',
      label: t('bookings.ratings.comfort'),
      description: t('bookings.ratings.comfortNote'),
    },
    {
      name: 'condition',
      label: t('bookings.ratings.vehicleCondition'),
      description: t('bookings.ratings.vehicleConditionNote'),
    },
    {
      name: 'valueForMoney',
      label: t('bookings.ratings.valueForMoney'),
      description: t('bookings.ratings.valueForMoneyNote'),
    },
  ] as const;

export const RENTAL_RATING_ITEMS = (t: Translator) =>
  [
    {
      name: 'overall',
      label: t('bookings.ratings.overallRental'),
      description: t('bookings.ratings.overallRentalNote'),
    },
    {
      name: 'communication',
      label: t('bookings.ratings.communication'),
      description: t('bookings.ratings.communicationNote'),
    },
    {
      name: 'pickupExperience',
      label: t('bookings.ratings.pickupExperience'),
      description: t('bookings.ratings.pickupExperienceNote'),
    },
    {
      name: 'returnExperience',
      label: t('bookings.ratings.returnExperience'),
      description: t('bookings.ratings.returnExperienceNote'),
    },
    {
      name: 'professionalism',
      label: t('bookings.ratings.professionalism'),
      description: t('bookings.ratings.professionalismNote'),
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
