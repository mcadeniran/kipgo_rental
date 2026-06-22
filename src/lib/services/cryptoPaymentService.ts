import {
  collection,
  doc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
  runTransaction,
  Timestamp,
} from 'firebase/firestore';
import { bookingConverter } from '../converters/bookingConverter';
import { Booking } from '@/app/[locale]/models/Booking';
import { db } from '@/app/[locale]/firebase/config';
import { findAvailableUnit } from '../helper/findAvailableUnit';
import { CarUnit } from '@/app/[locale]/models/CarUnit';

const bookingsRef = collection(db, 'bookings').withConverter(bookingConverter);

export async function getAwaitingVerificationPayments(): Promise<Booking[]> {
  const q = query(
    bookingsRef,
    orderBy('createdAt', 'desc'),
    where('payment.method', '==', 'crypto'),
    where('payment.status', '==', 'awaiting_verification'),
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => doc.data());
}

export async function verifyCryptoPayment(bookingId: string, userId: string) {
  await runTransaction(db, async (transaction) => {
    const bookingRef = doc(db, 'bookings', bookingId);

    const bookingSnap = await transaction.get(bookingRef);

    if (!bookingSnap.exists()) {
      throw new Error('Booking not found');
    }

    const booking = bookingSnap.data() as Booking;

    if (booking.payment?.status !== 'awaiting_verification') {
      throw new Error('Payment already processed');
    }

    const txid = booking.payment?.crypto?.txid?.trim().toLowerCase();

    if (!txid) {
      throw new Error('Missing TXID');
    }

    const txidRef = doc(db, 'cryptoTransactions', txid);

    const txidSnap = await transaction.get(txidRef);

    if (txidSnap.exists()) {
      throw new Error('TXID already used');
    }

    transaction.set(txidRef, {
      txid,
      bookingId: bookingId,
      verifiedAt: serverTimestamp(),
    });

    // Get all units for this car
    const unitsQuery = query(
      collection(db, `cars/${booking.carId}/units`),
      where('status', '==', 'available'),
    );

    const unitsSnap = await getDocs(unitsQuery);

    const units = unitsSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as CarUnit[];

    // Get active bookings
    const bookingsQuery = query(
      collection(db, 'bookings'),
      where('carId', '==', booking.carId),
      where('status', 'in', ['ongoing', 'approved', 'reserved']),
    );

    const bookingsSnap = await getDocs(bookingsQuery);

    const bookings = bookingsSnap.docs.map((doc) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      bookingConverter.fromFirestore(doc, {} as any),
    );

    const availableUnit = findAvailableUnit(units, bookings, booking);

    if (!availableUnit) {
      throw new Error('No available unit for selected dates');
    }

    transaction.update(bookingRef, {
      unitId: availableUnit.id,

      status: 'reserved',

      reservedAt: serverTimestamp(),

      paymentVerified: true,

      'payment.completed': true,

      'payment.status': 'paid',

      'payment.crypto.txidVerified': true,

      'payment.paidAt': serverTimestamp(),

      'payment.verification.verifiedAt': serverTimestamp(),

      'payment.verification.verifiedBy': userId,

      'payment.verified': true,
    });
  });
}

export async function rejectCryptoPayment(
  bookingId: string,
  reason: string,
  userId: string,
) {
  await runTransaction(db, async (transaction) => {
    const bookingRef = doc(db, 'bookings', bookingId);

    const bookingSnap = await transaction.get(bookingRef);

    if (!bookingSnap.exists()) {
      throw new Error('Booking not found');
    }

    const booking = bookingSnap.data() as Booking;

    if (booking.payment?.status !== 'awaiting_verification') {
      throw new Error('Payment already processed');
    }

    if (!reason.trim()) {
      throw new Error('Rejection reason is required');
    }

    transaction.update(bookingRef, {
      status: 'pending',

      'payment.status': 'failed',

      'payment.completed': false,

      'payment.expiresAt': Timestamp.fromDate(
        new Date(Date.now() + 30 * 60 * 1000),
      ),

      'payment.verified': false,

      'payment.crypto.txidVerified': false,

      'payment.rejection.reason': reason.trim(),

      'payment.crypto.status': 'failed',

      'payment.rejection.rejectedAt': serverTimestamp(),

      'payment.rejection.rejectedBy': userId,

      'payment.crypto.txidRejectedReason': reason.trim(),
    });
  });
}
