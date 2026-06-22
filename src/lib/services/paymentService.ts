import { db } from '@/app/[locale]/firebase/config';
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore';

export async function getMonthlyPayments(shopId: string, month: string) {
  const ref = collection(db, 'monthlyPayments');

  const q = query(
    ref,
    where('shopId', '==', shopId),
    where('month', '==', month),
  );

  const snap = await getDocs(q);

  const payments = snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const totalPaid = payments.reduce((sum, p: any) => sum + (p.amount || 0), 0);

  return { payments, totalPaid };
}

export async function addMonthlyPayment({
  shopId,
  month,
  amount,
}: {
  shopId: string;
  month: string;
  amount: number;
}) {
  const ref = collection(db, 'monthlyPayments');

  await addDoc(ref, {
    shopId,
    month,
    amount,
    paidAt: serverTimestamp(),
  });
}
