import * as z from 'zod';
import { Translator } from './create-schema';
import { addDays, differenceInCalendarDays, startOfDay } from 'date-fns';
import { BookingDraft } from '@/app/[locale]/bookings/new/BookingDraft';
import {
  MAX_CONS,
  MAX_PROS,
  MAX_REVIEW_IMAGES,
  MAX_REVIEW_LENGTH,
  MAX_TAG_LENGTH,
  MIN_REVIEW_LENGTH,
} from '@/constants/rating';

export const LoginFormSchema = (t: Translator) =>
  z.object({
    email: z
      .email(t('validation.emailInvalid'))
      .nonempty(t('validation.emailRequired')),
    password: z.string().min(1, t('validation.passwordRequired')),
  });

export const ResetPasswordFormSchema = (t: Translator) =>
  z.object({
    email: z
      .email(t('validation.emailInvalid'))
      .nonempty(t('validation.emailRequired')),
  });

export const RegisterFormSchema = (t: Translator) =>
  z.object({
    email: z
      .email(t('validation.emailInvalid'))
      .nonempty(t('validation.emailRequired')),
    password: z.string().min(8, 'Minimum 8 characters required'),
    username: z.string().min(1, 'Username is required'),
  });

export const BookingScheduleFormSchema = (t: Translator) =>
  z
    .object({
      pickupDate: z.date(),
      dropoffDate: z.date(),

      pickupTime: z.string().min(1),
      dropoffTime: z.string().min(1),

      deliveryType: z.enum(['pickup', 'delivery']),

      deliveryAddress: z.string().optional(),

      note: z.string().optional(),

      paymentMethod: z.enum(['crypto', 'payOnPickup']),
    })
    .superRefine((data, ctx) => {
      const today = startOfDay(new Date());

      const minimumPickup = addDays(today, 1);

      // Pickup must be tomorrow+

      if (startOfDay(data.pickupDate) < minimumPickup) {
        ctx.addIssue({
          code: 'custom',
          path: ['pickupDate'],
          message: 'Pickup must be at least 1 day from today',
        });
      }

      const rentalDays = differenceInCalendarDays(
        data.dropoffDate,
        data.pickupDate,
      );

      if (rentalDays < 3) {
        ctx.addIssue({
          code: 'custom',
          path: ['dropoffDate'],
          message: 'Minimum rental period is 3 days',
        });
      }

      if (data.deliveryType === 'delivery' && !data.deliveryAddress?.trim()) {
        ctx.addIssue({
          code: 'custom',
          path: ['deliveryAddress'],
          message: 'Delivery address is required',
        });
      }
    });

export const BookingDriverFormSchema = (t: Translator) =>
  z.object({
    selectedDriverId: z.string(),

    name: z.string().trim().min(2, 'Driver name is required'),

    email: z
      .email(t('validation.emailInvalid'))
      .nonempty(t('validation.emailRequired')),

    phone: z.string().trim().min(6, 'Phone number is required').max(20),

    dob: z.string().refine(
      (value) => {
        const dob = new Date(value);

        const age = new Date().getFullYear() - dob.getFullYear();

        return age >= 18;
      },
      {
        message: 'Driver must be at least 18 years old',
      },
    ),

    gender: z.enum(['Male', 'Female', 'Others']),
  });

export const DriverDocumentsSchema = (draft: BookingDraft, t: Translator) =>
  z
    .object({
      licenseFront: z.instanceof(File).optional(),
      licenseBack: z.instanceof(File).optional(),
      idCard: z.instanceof(File).optional(),
    })
    .superRefine((data, ctx) => {
      if (!draft.driverDocuments?.licenseFrontUrl && !data.licenseFront) {
        ctx.addIssue({
          code: 'custom',
          path: ['licenseFront'],
          message: 'Driver license front is required',
        });
      }

      if (!draft.driverDocuments?.licenseBackUrl && !data.licenseBack) {
        ctx.addIssue({
          code: 'custom',
          path: ['licenseBack'],
          message: 'Driver license back is required',
        });
      }

      if (!draft.driverDocuments?.idCardUrl && !data.idCard) {
        ctx.addIssue({
          code: 'custom',
          path: ['idCard'],
          message: 'Government ID is required',
        });
      }
    });

export const PaymentTxidSchema = (t: Translator) =>
  z.object({
    txid: z
      .string()
      .trim()
      .min(64, 'Transaction hash is required.')
      .max(64, 'Invalid transaction hash.')
      .regex(/^[A-Fa-f0-9]{64}$/, 'Invalid TRON transaction hash.'),
  });

const StarRatingSchema = z
  .number()
  .min(1, 'Please provide a rating.')
  .max(5, 'Ratings cannot exceed 5 stars.');

export const VehicleRatingSchema = z.object({
  overall: StarRatingSchema,
  cleanliness: StarRatingSchema,
  comfort: StarRatingSchema,
  condition: StarRatingSchema,
  valueForMoney: StarRatingSchema,
});

export const RentalRatingSchema = z.object({
  overall: StarRatingSchema,
  communication: StarRatingSchema,
  pickupExperience: StarRatingSchema,
  returnExperience: StarRatingSchema,
  professionalism: StarRatingSchema,
});

export const ReviewDetailsSchema = z.object({
  title: z.string().trim().min(5).max(120),
  review: z.string().trim().min(MIN_REVIEW_LENGTH).max(MAX_REVIEW_LENGTH),
  pros: z.array(z.string().trim().min(1).max(MAX_TAG_LENGTH)).max(MAX_PROS),
  cons: z.array(z.string().trim().min(1).max(MAX_TAG_LENGTH)).max(MAX_CONS),
  // photos: z.array(z.instanceof(File)).max(MAX_REVIEW_IMAGES),
  photos: z.array(z.custom<File>()).max(MAX_REVIEW_IMAGES),
  wouldRecommend: z.boolean(),
  wouldRentAgain: z.boolean(),
  isAnonymous: z.boolean(),
});

export const RatingSchema = z.object({
  vehicle: VehicleRatingSchema,
  rental: RentalRatingSchema,
  details: ReviewDetailsSchema,
});

export type RatingFormValues = z.infer<typeof RatingSchema>;

export const ProfileSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  phone: z.string().min(7),
});
