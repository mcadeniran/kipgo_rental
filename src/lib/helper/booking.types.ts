import { BookingDraft } from '@/app/[locale]/bookings/new/BookingDraft';
import { UserProfile } from '@/app/[locale]/models/UserProfile';
import { CarWithShop } from '../services/CarWithShop';
import { Wallet } from '@/app/[locale]/models/Wallet';
import { Renter } from '@/app/[locale]/models/Renter';
import { BookingTotals } from '@/app/[locale]/bookings/new/bookingTotals';

export interface CreateBookingInput {
  draft: BookingDraft;
  profile: UserProfile;
  carShop: CarWithShop;
  wallet?: Wallet;
}

export interface BookingResult {
  bookingId: string;

  invoiceNumber: string;

  paymentId?: string;
}

export interface UploadedDocuments {
  licenseFront?: string;

  licenseBack?: string;

  idCard?: string;
}

export type PaymentMethod = 'crypto' | 'payOnPickup';

export type BookingStatus =
  | 'pending'
  | 'approved'
  | 'ongoing'
  | 'completed'
  | 'cancelled'
  | 'rejected';

export interface BuildBookingPayloadInput {
  draft: BookingDraft;

  renter: Renter;

  profile: UserProfile;

  carShop: CarWithShop;

  totals: BookingTotals;

  invoiceNumber: string;

  wallet: Wallet;
}
