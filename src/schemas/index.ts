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
    password: z.string().min(8, t('validation.passwordMinLength')),
    username: z.string().trim().min(1, t('validation.usernameRequired')),
  });

export const DeleteAccountSchema = (t: Translator) =>
  z
    .object({
      email: z.email(t('validation.invalidEmail')),
      password: z.string().min(6),
      confirmation: z.string(),
      accepted: z.boolean().refine((v) => v, {
        message: t('validation.mustAccept'),
      }),
    })
    .superRefine((data, ctx) => {
      if (data.confirmation.trim() !== 'DELETE') {
        ctx.addIssue({
          code: 'custom',
          path: ['confirmation'],
          message: t('validation.typeDelete'),
        });
      }
    });

export const BookingScheduleFormSchema = (t: Translator) =>
  z
    .object({
      pickupDate: z.date({
        error: t('validation.pickupDateRequired'),
      }),
      dropoffDate: z.date({
        error: t('validation.dropoffDateRequired'),
      }),

      pickupTime: z.string().min(1, t('validation.pickupTimeRequired')),
      dropoffTime: z.string().min(1, t('validation.dropoffTimeRequired')),

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
          message: t('validation.pickupMustBeTomorrow'),
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
          message: t('validation.minimumRentalPeriod'),
        });
      }

      if (data.deliveryType === 'delivery' && !data.deliveryAddress?.trim()) {
        ctx.addIssue({
          code: 'custom',
          path: ['deliveryAddress'],
          message: t('validation.deliveryAddressRequired'),
        });
      }
    });

export const BookingDriverFormSchema = (t: Translator) =>
  z.object({
    selectedDriverId: z.string(),
    name: z.string().trim().min(2, t('validation.driverNameRequired')),

    email: z
      .email(t('validation.emailInvalid'))
      .nonempty(t('validation.emailRequired')),

    phone: z
      .string()
      .trim()
      .min(6, t('validation.phoneRequired'))
      .max(20, t('validation.phoneInvalid')),

    dob: z.string().refine(
      (value) => {
        const dob = new Date(value);

        const age = new Date().getFullYear() - dob.getFullYear();

        return age >= 18;
      },
      {
        message: t('validation.driverMustBe18'),
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
          message: t('validation.licenseFrontRequired'),
        });
      }

      if (!draft.driverDocuments?.licenseBackUrl && !data.licenseBack) {
        ctx.addIssue({
          code: 'custom',
          path: ['licenseBack'],
          message: t('validation.licenseBackRequired'),
        });
      }

      if (!draft.driverDocuments?.idCardUrl && !data.idCard) {
        ctx.addIssue({
          code: 'custom',
          path: ['idCard'],
          message: t('validation.idCardRequired'),
        });
      }
    });

export const PaymentTxidSchema = (t: Translator) =>
  z.object({
    txid: z
      .string()
      .trim()
      .min(64, t('validation.txidRequired'))
      .max(64, t('validation.txidInvalid'))
      .regex(/^[A-Fa-f0-9]{64}$/, t('validation.txidInvalid')),
  });

export const StarRatingSchema = (t: Translator) =>
  z
    .number()
    .min(1, t('validation.ratingRequired'))
    .max(5, t('validation.ratingMax'));

export const VehicleRatingSchema = (t: Translator) =>
  z.object({
    overall: StarRatingSchema(t),
    cleanliness: StarRatingSchema(t),
    comfort: StarRatingSchema(t),
    condition: StarRatingSchema(t),
    valueForMoney: StarRatingSchema(t),
  });

export const RentalRatingSchema = (t: Translator) =>
  z.object({
    overall: StarRatingSchema(t),
    communication: StarRatingSchema(t),
    pickupExperience: StarRatingSchema(t),
    returnExperience: StarRatingSchema(t),
    professionalism: StarRatingSchema(t),
  });

export const ReviewDetailsSchema = (t: Translator) =>
  z.object({
    title: z
      .string()
      .trim()
      .min(5, t('validation.reviewTitleMin'))
      .max(120, t('validation.reviewTitleMax')),
    review: z
      .string()
      .trim()
      .min(MIN_REVIEW_LENGTH, t('validation.reviewMin'))
      .max(MAX_REVIEW_LENGTH, t('validation.reviewMax')),
    pros: z
      .array(z.string().trim().min(1).max(MAX_TAG_LENGTH))
      .max(MAX_PROS, t('validation.maxPros')),
    cons: z
      .array(z.string().trim().min(1).max(MAX_TAG_LENGTH))
      .max(MAX_CONS, t('validation.maxCons')),
    photos: z
      .array(z.custom<File>())
      .max(MAX_REVIEW_IMAGES, t('validation.maxReviewImages')),
    wouldRecommend: z.boolean(),
    wouldRentAgain: z.boolean(),
    isAnonymous: z.boolean(),
  });

export const RatingSchema = (t: Translator) =>
  z.object({
    vehicle: VehicleRatingSchema(t),
    rental: RentalRatingSchema(t),
    details: ReviewDetailsSchema(t),
  });

// export type RatingFormValues = z.infer<typeof RatingSchema>;
export type RatingFormValues = z.infer<ReturnType<typeof RatingSchema>>;

export const ProfileSchema = (t: Translator) =>
  z.object({
    firstName: z.string().min(2, t('validation.firstNameRequired')),
    lastName: z.string().min(2, t('validation.lastNameRequired')),
    phone: z.string().min(7, t('validation.phoneRequired')),
  });
