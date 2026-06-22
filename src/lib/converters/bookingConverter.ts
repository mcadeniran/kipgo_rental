import {
  Booking,
  BookingPayment,
  PaymentVerification,
  PaymentRejection,
} from '@/app/[locale]/models/Booking';
import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
} from 'firebase/firestore';

export const bookingConverter: FirestoreDataConverter<Booking> = {
  toFirestore(booking: Booking) {
    return {
      ...booking,
    };
  },

  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ): Booking {
    const data = snapshot.data(options);

    return {
      id: snapshot.id,

      invoiceNumber: data.invoiceNumber ?? '',

      source: data.source ?? 'app',

      carId: data.carId ?? '',
      shopId: data.shopId ?? '',
      userId: data.userId ?? '',
      driverId: data.driverId ?? '',

      unitId: data.unitId ?? null,

      pickupDate: parseTimestamp(data.pickupDate) ?? new Date(),

      dropoffDate: parseTimestamp(data.dropoffDate) ?? new Date(),

      deliveryType: data.deliveryType ?? '',

      deliveryAddress: data.deliveryAddress ?? '',

      rentalPrice: data.rentalPrice ?? 0,

      deliveryPrice: data.deliveryPrice ?? 0,

      deposit: data.deposit ?? 0,

      taxRate: data.taxRate ?? 0,

      preTax: data.preTax ?? 0,

      tax: data.tax ?? 0,

      totalPrice: data.totalPrice ?? 0,

      currency: data.currency ?? 'TRY',

      note: data.note ?? '',

      status: data.status ?? 'pending',

      rejectionReason: data.rejectionReason,

      car: data.car,

      shop: data.shop,

      driver: data.driver,

      rating: data.rating ?? {
        carRating: 0,
        companyRating: 0,
        review: '',
      },

      isRated: data.isRated ?? false,

      payment: parseBookingPayment(data.payment) ?? null,

      paymentReference: data.paymentReference,

      transactionId: data.transactionId,

      paymentVerified: data.paymentVerified ?? false,

      createdAt: parseTimestamp(data.createdAt) ?? new Date(),

      approvedAt: parseTimestamp(data.approvedAt),

      startedAt: parseTimestamp(data.startedAt),

      completedAt: parseTimestamp(data.completedAt),

      rejectedAt: parseTimestamp(data.rejectedAt),

      paidAt: parseTimestamp(data.paidAt),

      reservedAt: parseTimestamp(data.reservedAt),

      cancelledAt: parseTimestamp(data.cancelledAt),

      expiredAt: parseTimestamp(data.expiredAt),
    };
  },
};

export interface PaymentCrypto {
  walletAddress: string;

  network: string;

  currency: string;

  amount: number;

  networkFee: number;

  txidVerified: boolean;

  txidRejectedReason?: string;

  txid?: string;

  txidSubmittedAt?: Date;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parsePaymentCrypto = (data: any): PaymentCrypto | undefined => {
  if (!data) return undefined;

  return {
    walletAddress: data.walletAddress ?? '',

    network: data.network ?? 'TRC20',

    currency: data.currency ?? 'USDT',

    amount: Number(data.amount ?? 0),

    networkFee: Number(data.networkFee ?? 0),

    txidVerified: data.txidVerified ?? false,

    txidRejectedReason: data.txidRejectedReason,

    txid: data.txid,

    txidSubmittedAt: parseTimestamp(data.submittedAt),
  };
};

export const parsePaymentVerification = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
): PaymentVerification | undefined => {
  if (!data) return undefined;

  return {
    verifiedBy: data.verifiedBy,

    verifiedAt: parseTimestamp(data.verifiedAt),
  };
};

export const parsePaymentRejection = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
): PaymentRejection | undefined => {
  if (!data) return undefined;

  return {
    reason: data.reason,

    rejectedAt: parseTimestamp(data.rejectedAt),

    rejectedBy: data.rejectedBy,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseBookingPayment = (data: any): BookingPayment | undefined => {
  if (!data) return undefined;

  return {
    method: data.method ?? 'payOnPickup',

    status: data.status ?? 'unpaid',

    verified: data.verified ?? false,

    completed: data.completed ?? false,

    reference: data.reference,

    transactionId: data.transactionId,

    paidAt: parseTimestamp(data.paidAt),

    expiresAt: parseTimestamp(data.expiresAt),

    crypto: parsePaymentCrypto(data.crypto),

    verification: parsePaymentVerification(data.verification),

    rejection: parsePaymentRejection(data.rejection),
  };
};

const parseTimestamp = (value: Timestamp | Date): Date | undefined => {
  if (!value) return undefined;

  if (value instanceof Timestamp) {
    return value.toDate();
  }

  if (value instanceof Date) {
    return value;
  }

  return undefined;
};
