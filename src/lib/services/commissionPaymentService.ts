import { db } from '@/app/[locale]/firebase/config';
import {
  collection,
  doc,
  getDocs,
  query,
  where,
  setDoc,
} from 'firebase/firestore';
import { commissionPaymentConverter } from '../converters/commissionPaymentConverter';
import { CommissionPayment } from '@/app/[locale]/models/CommissionPayment';

// Create payment
export async function createCommissionPayment(payment: CommissionPayment) {
  const ref = doc(db, 'commissionPayments', payment.id).withConverter(
    commissionPaymentConverter,
  );

  await setDoc(ref, payment);
}

// Get payments for a summary
export async function getPaymentsBySummary(summaryId: string) {
  const ref = collection(db, 'commissionPayments').withConverter(
    commissionPaymentConverter,
  );

  const q = query(ref, where('summaryId', '==', summaryId));
  const snaps = await getDocs(q);

  return snaps.docs.map((doc) => doc.data());
}
