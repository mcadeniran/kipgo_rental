import { db } from '@/app/[locale]/firebase/config';
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';

export async function expireBooking(bookingId: string) {
  await updateDoc(doc(db, 'bookings', bookingId), {
    status: 'expired',
    expiredAt: serverTimestamp(),
    'payment.status': 'expired',
    'payment.expiresAt': null,
  });
}

export async function submitBookingTxid(bookingId: string, txid: string) {
  const ref = doc(db, 'bookings', bookingId);

  await updateDoc(ref, {
    status: 'payment_submitted',
    'payment.crypto.txid': txid,
    'payment.crypto.status': 'awaiting_verification',
    'payment.crypto.txidSubmittedAt': serverTimestamp(),
    'payment.crypto.submittedAt': serverTimestamp(),
    'payment.expiresAt': null,
    'payment.status': 'awaiting_verification',
  });
}
