export type BookingStatus =
  | 'pending'
  | 'payment_submitted'
  | 'reserved'
  | 'approved'
  | 'ongoing'
  | 'completed'
  | 'rejected'
  | 'cancelled'
  | 'expired';

export type BookingGroup =
  | 'attention'
  | 'upcoming'
  | 'ongoing'
  | 'completed'
  | 'closed';

export type PaymentMethod = 'crypto' | 'payOnPickup';

export type PaymentStatus =
  | 'unpaid'
  | 'pending'
  | 'awaiting_verification'
  | 'paid'
  | 'failed'
  | 'expired';

export interface BookingRating {
  carRating: number;
  companyRating: number;
  review: string;
}

export interface BookingCar {
  brand: string;
  model: string;
  year: number;
  seats: number;
  transmission: string;
  fuel: string;
  carImage: string;
  pricePerDay: number;
  carType?: string;
}

export interface BookingLocation {
  lat: number;
  lng: number;
}

export interface BookingShop {
  name: string;
  logo: string;
  address: string;
  city: string;
  district: string;
  location: BookingLocation;
}

export interface BookingDriver {
  name: string;
  phone: string;
  email: string;
  dob: string;
  gender: string;

  licenseFront: string;
  licenseBack: string;
  idCard: string;
}

export interface PaymentVerification {
  verifiedBy?: string | null;
  verifiedAt?: Date | null;
}

export interface PaymentRejection {
  reason?: string | null;
  rejectedAt?: Date | null;
  rejectedBy?: string | null;
}

export interface PaymentCrypto {
  walletAddress: string;

  network: string;

  currency: string;

  amount: number;

  networkFee: number;

  txidVerified: boolean;

  txidRejectedReason?: string | null;

  txid?: string | null;

  txidSubmittedAt?: Date | null;

  submittedAt?: Date | null;
}

export interface BookingPayment {
  method: PaymentMethod;

  status: PaymentStatus;

  verified: boolean;

  completed: boolean;

  reference?: string | null;

  transactionId?: string | null;

  paidAt?: Date | null;

  expiresAt?: Date | null;

  crypto?: PaymentCrypto | null;

  verification?: PaymentVerification | null;

  rejection?: PaymentRejection | null;
}

export interface Booking {
  id: string;

  invoiceNumber: string;

  source: string;

  carId: string;
  shopId: string;
  userId: string;
  driverId: string;

  unitId?: string | null;

  pickupDate: Date;
  dropoffDate: Date;

  deliveryType: string;
  deliveryAddress: string;

  rentalPrice: number;
  deliveryPrice: number;
  deposit: number;

  createdBy: string;

  createdById: string;

  taxRate: number;
  preTax: number;
  tax: number;
  totalPrice: number;

  currency: string;

  note: string;

  status: BookingStatus;

  rejectionReason?: string | null;

  car: BookingCar;

  shop: BookingShop;

  driver: BookingDriver;

  rating: BookingRating;

  isRated: boolean;

  payment?: BookingPayment | null;

  paymentReference?: string | null;

  transactionId?: string | null;

  paymentVerified: boolean;

  createdAt: Date;

  approvedAt?: Date | null;

  startedAt?: Date | null;

  completedAt?: Date | null;

  rejectedAt?: Date | null;

  paidAt?: Date | null;

  reservedAt?: Date | null;

  cancelledAt?: Date | null;

  expiredAt?: Date | null;
}
