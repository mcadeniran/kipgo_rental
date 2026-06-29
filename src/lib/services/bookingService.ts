import { db } from '@/app/[locale]/firebase/config';
import { Booking } from '@/app/[locale]/models/Booking';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  Timestamp,
  where,
} from 'firebase/firestore';
import { bookingConverter } from '../converters/bookingConverter';
import { Renter } from '@/app/[locale]/models/Renter';
import { renterConverter } from '../converters/renterConverter';
import { calculateBookingTotals } from '@/app/[locale]/bookings/new/bookingTotals';
import { CreateBookingInput } from '../helper/booking.types';
import { generateInvoiceNumber } from '../helper/generateInvoiceNumber';
import { resolveRenter } from '../helper/resolveRenter';
import { uploadDriverDocuments } from '../helper/uploadDriverDocuments';
import { buildBookingPayload } from '../helper/buildBookingPayload';

const bookingsRef = collection(db, 'bookings').withConverter(bookingConverter);

export async function getBookingsByUserId(userId: string): Promise<Booking[]> {
  const q = query(bookingsRef, where('userId', '==', userId));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => doc.data());
}

export async function getBookingById(id: string): Promise<Booking | null> {
  const ref = doc(db, 'bookings', id).withConverter(bookingConverter);

  const snap = await getDoc(ref);

  return snap.exists() ? snap.data() : null;
}

export async function getCarBookings(carId: string): Promise<Booking[]> {
  const q = query(
    bookingsRef,
    where('carId', '==', carId),
    where('status', 'in', ['approved', 'reserved', 'ongoing']),
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => doc.data());
}

export async function getDriversByUserId(userId: string): Promise<Renter[]> {
  const rentersRef = collection(
    db,
    'profiles',
    userId,
    'renters',
  ).withConverter(renterConverter);
  const snapshot = await getDocs(rentersRef);

  return snapshot.docs.map((doc) => doc.data());
}

export async function initializeBooking(
  input: CreateBookingInput,
): Promise<{ bookingId: string; invoiceNumber: string }> {
  // Upload new documents
  const uploadedDocuments = await uploadDriverDocuments(
    input.profile.id,
    input.draft.driverDocuments,
  );

  // Create / update / reuse driver
  const renter = await resolveRenter({
    draft: input.draft,
    profile: input.profile,
    documents: uploadedDocuments,
  });

  // Calculate totals
  const totals = calculateBookingTotals(input.draft, input.carShop);

  // Generate invoice
  const invoice = generateInvoiceNumber();

  // Build booking object
  const booking = await buildBookingPayload({
    draft: input.draft,
    renter,
    profile: input.profile,
    carShop: input.carShop,
    totals,
    invoiceNumber: invoice,
    wallet: input.wallet!,
  });

  // Save booking
  const bookingId = await createBooking(booking);

  return {
    bookingId,
    invoiceNumber: invoice,
  };
}

export async function createBooking(
  booking: Partial<Booking>,
): Promise<string> {
  const ref = await addDoc(collection(db, 'bookings'), {
    ...booking,
    createdAt: serverTimestamp(),
    pickupDate: Timestamp.fromDate(booking.pickupDate!),
    dropoffDate: Timestamp.fromDate(booking.dropoffDate!),
  });
  return ref.id;
}
